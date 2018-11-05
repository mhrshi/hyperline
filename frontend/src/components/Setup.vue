<template>
    <v-app>
        <v-container class="pa-0" fill-height fluid>
            <v-layout class="wrapper">
                <v-flex class="setup grey lighten-5">
                    <v-layout class="content-setup" column>
                        <div class="mt-3 content-setup-title">
                            <p class="text-xs-center headline font-monospace">Setup</p>
                            <v-divider></v-divider>
                        </div>
                        <div class="content-setup-host">
                            <v-img
                                class="mx-4 my-4 illus"
                                :src="require('../assets/host.svg')"
                                max-height="280"
                                @click="openSetup(0)"
                                contain>
                            </v-img>
                            <p class="text-xs-center body-2">Host a new game</p>
                        </div>
                        <div class="content-setup-connect">
                            <v-img
                                class="mx-4 my-4 illus"
                                :src="require('../assets/connect.svg')"
                                max-height="280"
                                @click="openSetup(1)"
                                contain>
                            </v-img>
                            <p class="text-xs-center body-2">Connect with a friend</p>
                        </div>
                    </v-layout>
                </v-flex>
                <v-flex class="about light-blue lighten-5">
                    <v-layout class="content-about" column>
                        <div class="mt-3 content-about-title">
                            <p class="text-xs-center headline font-monospace game-title">hyperline</p>
                            <v-divider></v-divider>
                        </div>
                        <div class="mx-5 content-about-info">
                            <p class="text-xs-center font-italic title font-weight-regular spacing">&ldquo;Line. Not the usual one.&rdquo;</p>
                            <br/>
                            <div class="mx-5">
                                <p class="subheading">
                                    A generalized tic-tac-toe game with 3 different levels and 2 different variants to play.
                                    The goal is to create a hyperline spanning across a row, column, or any of the 2 diagonals.
                                </p>
                                <p class="subheading font-weight-medium pt-2">Levels/Grids</p>
                                <p class="subheading">
                                    &bull; Child's play <span class="px-1">&#x279D;</span> 3 &#10006; 3
                                    <br/>
                                    &bull; Passable <span class="px-1">&#x279D;</span> 5 &#10006; 5
                                    <br/>
                                    &bull; Insane <span class="px-1">&#x279D;</span> 7 &#10006; 7
                                </p>
                                <p class="subheading font-weight-medium pt-2">Variants</p>
                                <p class="subheading">
                                    &horbar;&nbsp;&nbsp;Standard
                                    <br/>
                                    The normal tic-tac-toe. Two players, X & O take turns in marking the places. First to create a hyperline wins.
                                </p>
                                <p class="subheading">
                                    &horbar;&nbsp;&nbsp;Numeric
                                    <br/>
                                    Two players, one plays with odd numbers, other with even. For a given grid, numbers from 1 to X are used.
                                    First to create a hyperline summing upto Y wins.
                                </p>
                                <br/>
                                <v-data-table
                                    style="max-width: 60%;"
                                    :headers="headers"
                                    :items="items"
                                    hide-actions
                                    class="elevation-3 mx-auto">
                                    <template slot="items" slot-scope="props">
                                        <td v-html="props.item.grid" class="text-xs-center"></td>
                                        <td class="text-xs-center">{{ props.item.x }}</td>
                                        <td class="text-xs-center">{{ props.item.y }}</td>
                                    </template>
                                </v-data-table>
                            </div>
                        </div>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-dialog v-model="setupDialog" max-width="500px" persistent>
                <v-card>
                    <v-card-title class="pb-1 title font-weight-regular">{{ currentTitle }}</v-card-title>
                    <v-window v-model="setupStep">
                        <v-window-item :value="1">
                            <v-card-text>
                                <v-text-field
                                    v-if="setupDialog"
                                    v-model="gamerName"
                                    :error-messages="gamerNameError"
                                    label="Gamer name"
                                    @focus="onFocus"
                                    autofocus>
                                </v-text-field>
                                <p class="mb-0 pt-3 caption grey--text text--darken-1">You will be identified by this name throughout the game</p>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    @click="nextWindow"
                                    class="my-1 mr-1"
                                    color="primary"
                                    :loading="buttonLoader"
                                    :disabled="buttonLoader">
                                    {{ setupChoice === 0 ? 'host' : 'next' }}
                                </v-btn>
                            </v-card-actions>
                        </v-window-item>
                        <v-window-item :value="2" v-if="setupChoice === 0">
                            <v-card-text class="pt-0">
                                <p class="py-4 mb-0 text-xs-center display-1 blue--text text--darken-2 font-monospace">
                                    {{ $store.state.sessionId }}
                                </p>
                                <p class="pt-2 mb-0 caption grey--text text--darken-1">
                                    Ask your friend to use the above session ID to connect with you
                                </p>
                            </v-card-text>
                        </v-window-item>
                        <v-window-item :value="2" v-else>
                            <v-card-text>
                                <v-text-field
                                    label="Session ID"
                                    v-model="sessionId"
                                    :error-messages="sessionError"
                                    @focus="onFocus"
                                    autofocus>
                                </v-text-field>
                                <p class="mb-0 pt-3 caption grey--text text--darken-1">Enter session ID generated by your friend to connect</p>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="validateSession" class="my-1 mr-1" color="primary">
                                    connect
                                </v-btn>
                            </v-card-actions>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: 'Setup',

        data() {
            return {
                setupDialog: false,
                setupChoice: 0,
                setupStep: 1,
                buttonLoader: false,
                gamerName: '',
                gamerNameError: '',
                sessionId: '',
                sessionError: '',
                headers: [
                    {
                        text: 'Grid',
                        align: 'center',
                        sortable: false
                    },
                    {
                        text: 'X',
                        align: 'center',
                        sortable: false
                    },
                    {
                        text: 'Y',
                        align: 'center',
                        sortable: false
                    }
                ],
                items: [
                    {
                        grid: '3 &#10006; 3',
                        x: '9',
                        y: '15'
                    },
                    {
                        grid: '5 &#10006; 5',
                        x: '25',
                        y: '65'
                    },
                    {
                        grid: '7 &#10006; 7',
                        x: '49',
                        y: '175'
                    }
                ]
            }
        },

        methods: {
            openSetup(choice) {
                this.setupDialog = true;
                this.setupChoice = choice;
            },

            nextWindow() {
                if (!this.gamerName) {
                    this.gamerNameError = 'Required';
                    return;
                }
                if (this.setupChoice === 0) {
                    this.buttonLoader = true;
                    this.$store.state.socket.emit('newHost', this.gamerName);
                    this.$store.state.socket.on('sessionAssigned', id => {
                        this.$store.commit({
                            type: 'assignSession',
                            id: id,
                            marker: 1,
                            starter: true
                        });
                        this.buttonLoader = false;
                        this.setupStep++;
                    });
                    this.$store.state.socket.on('playerAdded', payload => {
                        if (payload.success) {
                            this.$store.commit({
                                type: 'setPlayerNames',
                                p1: payload[1],
                                p2: payload[2]
                            });
                            this.$router.push('/game');
                        }
                    })
                } else {
                    this.setupStep++;
                }
            },

            validateSession() {
                this.$store.state.socket.emit('addPlayer', this.gamerName, this.sessionId.trim());
                this.$store.state.socket.on('playerAdded', payload => {
                    if (!payload.success) {
                        this.sessionError = 'Session not found';
                    } else {
                        this.$store.commit({
                            type: 'assignSession',
                            id: this.sessionId,
                            marker: 2,
                            starter: false
                        });
                        this.$store.commit({
                            type: 'setPlayerNames',
                            p1: payload[1],
                            p2: payload[2]
                        });
                        this.$router.push('/game');
                    }
                });
            },

            onFocus() {
                this.sessionError = '';
                this.gamerNameError = '';
            }
        },

        computed: {
            currentTitle() {
                switch(this.setupStep) {
                    case 1: return 'Name';
                    case 2:
                        return this.setupChoice === 0 ? 'Waiting...' : 'Connect';
                }
            }
        }
    }
</script>

<style scoped>

    .wrapper {
        display: flex;
    }

    .setup {
        flex-basis: 40%;
    }

    .content-setup {
        height: 100%;
    }

    .content-setup-title {
        flex-basis: 8%;
    }

    .content-setup-host {
        flex-basis: 46%;
    }

    .content-setup-connect {
        flex-basis: 46%;
    }

    .about {
        flex-basis: 60%;
    }

    .content-about {
        height: 100%;
    }

    .content-about-title {
        flex-basis: 8%;
    }

    .content-about-info {
        flex-basis: 92%;
    }

    .illus {
        -webkit-filter: grayscale(90%);
        filter: grayscale(90%);
        cursor: pointer;
    }

    .illus:hover {
        filter: initial;
    }

    .font-monospace {
        font-family: 'Roboto Mono', 'Courier New', Courier, monospace !important;
    }

    .game-title {
        letter-spacing: 8px !important;
        text-transform: uppercase;
    }

</style>