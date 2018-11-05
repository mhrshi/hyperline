<template>
    <v-app>
        <v-toolbar prominent>
            <v-toolbar-title class="text-xs-center headline font-monospace game-title">hyperline</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-menu
                    transition="slide-y-transition"
                    bottom
                    offset-y>
                    <v-btn flat slot="activator">level</v-btn>
                    <v-list>
                        <v-list-tile
                            v-for="(level, i) in levels"
                            :key="i"
                            @click="emitChange(level)"
                            :disabled="gameOngoing || !$store.state.starter">
                            <v-list-tile-title>{{ level.name }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu
                    transition="slide-y-transition"
                    bottom
                    offset-y>
                    <v-btn flat slot="activator">variant</v-btn>
                    <v-list>
                        <v-list-tile
                            v-for="(variant, i) in variants"
                            :key="i"
                            @click="resetGrid(variant)"
                            :disabled="true">
                            <v-list-tile-title>{{ variant.name }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <v-container class="pa-0" fill-height fluid>
            <v-layout class="wrapper">
                <v-flex class="game" justify-center align-center>
                    <div
                        class="pa-5 grid"
                        :class="`grid-size-${currentLevel}`">
                        <div
                            class="grid-box"
                            v-for="(value, i) in gridArray"
                            :key="i"
                            @click="markSpace(i)">
                            <v-img
                                v-if="value"
                                :src="require(`../assets/p${value}.svg`)"
                                max-width="35%"
                                contain>
                            </v-img>
                        </div>
                    </div>
                </v-flex>
                <v-flex :class="`updates ${resultColor} lighten-5`">
                    <v-layout class="py-5 mx-5" column fill-height>
                        <div class="mb-5 versus">
                            <p class="mb-0 text-xs-center title">{{ $store.state.p1 }}</p>
                            <v-img
                                class="mx-4"
                                :src="require('../assets/versus.svg')"
                                max-width="50px"
                                contain>
                            </v-img>
                            <p class="mb-0 text-xs-center title">{{ $store.state.p2 }}</p>
                        </div>
                        <div v-if="!wonBy">
                            <p class="subheading text-xs-center">Current turn</p>
                            <p class="title text-xs-center">{{ currentPlayer }}</p>
                        </div>
                        <div v-else-if="wonBy === 'none'">
                            <p class="title text-xs-center">Draw!</p>
                            <p class="text-xs-center">
                                <v-btn
                                    v-if="$store.state.starter"
                                    color="blue-grey darken-3"
                                    @click="emitPlayAgain"
                                    dark>
                                    play again
                                </v-btn>
                            </p>
                        </div>
                        <div v-else>
                            <p class="title text-xs-center">Winner: {{ wonBy }}</p>
                            <p class="text-xs-center">
                                <v-btn
                                    v-if="$store.state.starter"
                                    color="blue-grey darken-3"
                                    @click="emitPlayAgain"
                                    dark>
                                    play again
                                </v-btn>
                            </p>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: 'Game',
        data() {
            return {
                levels: [
                    {
                        name: 'Child\'s play',
                        value: 3
                    },
                    {
                        name: 'Passable',
                        value: 5
                    },
                    {
                        name: 'Insane',
                        value: 7
                    }
                ],
                currentLevel: 3,
                variants: [
                    {
                        name: 'Standard',
                        value: 0
                    },
                    {
                        name: 'Numeric',
                        value: 1
                    }
                ],
                currentVariant: 0,
                resultColor: 'amber',
                gridArray: [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ],
                currentPlayer: this.$store.state[this.$store.state.firstTurn],
                turn: this.$store.state.starter,
                gameOngoing: false,
                wonBy: ''
            }
        },

        methods: {
            emitChange(updated) {
                this.$store.state.socket.emit('gridChange', updated.value);
            },

            resetGrid(updatedSize) {
                this.currentLevel = updatedSize;
                this.gridArray = Array(updatedSize * updatedSize).fill(0);
            },

            markSpace(index) {
                this.gameOngoing = true;
                if (this.gridArray[index] || !this.turn || this.wonBy) {
                    return;
                }
                this.turn = false;
                this.$set(this.gridArray, index, this.$store.state.marker);
                this.$store.state.socket.emit('turnPlayed',
                    { index, gridArray: this.gridArray });
            },

            checkForDraw() {
                if (this.gridArray.indexOf(0) === -1) {
                    this.wonBy = 'none';
                    this.resultColor = 'blue-grey';
                    this.gameOngoing = false;
                    this.$store.commit('invertStarter');
                    this.turn = this.$store.state.starter;
                }
            },

            emitPlayAgain() {
                this.$store.state.socket.emit('playAgain', this.currentLevel);
            },

            playAgain(gridSize) {
                this.resetGrid(gridSize);
                this.wonBy = '';
                this.resultColor = 'amber';
                this.currentPlayer = this.$store.state[this.$store.state.firstTurn];
            }
        },

        mounted: function() {
            this.turn = this.$store.state.marker === 1;
            this.$store.state.socket.on('destroySession', () => {
                window.location.reload();
            });
            this.$store.state.socket.on('nextTurn', payload => {
                this.currentPlayer = this.$store.state[`p${payload.newMarker}`];
                Object.assign(this.gridArray, payload.gridArray);
                this.turn = payload.newMarker === this.$store.state.marker;
                this.wonBy = payload.wonBy;
                if (this.wonBy) {
                    this.resultColor = 'green';
                    this.gameOngoing = false;
                    this.$store.commit('invertStarter');
                    this.turn = this.$store.state.starter;
                } else {
                    this.checkForDraw();
                }
            });
            this.$store.state.socket.on('updateGrid', updatedSize => this.resetGrid(updatedSize));
            this.$store.state.socket.on('resetGame', gridSize => this.playAgain(gridSize));
        }
    }
</script>

<style scoped>
    .wrapper {
        display: flex;
    }

    .game {
        flex-basis: 70%;
        display: flex;
    }

    .updates {
        flex-basis: 30%;
    }

    .font-monospace {
        font-family: 'Roboto Mono', 'Courier New', Courier, monospace !important;
    }

    .game-title {
        letter-spacing: 8px !important;
        text-transform: uppercase;
    }

    .grid {
        display: grid;
        justify-content: stretch;
        width: 100%;
        height: 100%;
    }

    .grid-box {
        grid-row-start: auto;
        grid-row-end: auto;
        grid-column-start: auto;
        grid-column-end: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 6px solid #37474F;
        border-right: 6px solid #37474F;
        cursor: pointer;
    }

    .grid-size-3 {
        grid-template-rows: repeat(3, 1fr);
        grid-template-columns: repeat(3, 1fr);
    }

    .grid-size-3 .grid-box:nth-of-type(3n) {
        border-right: none;
    }

    .grid-size-3 .grid-box:nth-last-child(-n+3) {
        border-bottom: none;
    }

    .grid-size-5 {
        grid-template-rows: repeat(5, 1fr);
        grid-template-columns: repeat(5, 1fr);
    }

    .grid-size-5 .grid-box:nth-of-type(5n) {
        border-right: none;
    }

    .grid-size-5 .grid-box:nth-last-child(-n+5) {
        border-bottom: none;
    }

    .grid-size-7 {
        grid-template-rows: repeat(7, 1fr);
        grid-template-columns: repeat(7, 1fr);
    }

    .grid-size-7 .grid-box:nth-of-type(7n) {
        border-right: none;
    }

    .grid-size-7 .grid-box:nth-last-child(-n+7) {
        border-bottom: none;
    }

    .versus {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>