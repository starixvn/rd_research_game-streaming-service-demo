const players: string[] = [];

const addPlayer = (id: string) => {
    console.log("Player join: ", id);
    players.push(id);
};

const removePlayer = (id: string) => {
    console.log("Player leave: ", id);
    players.splice(players.indexOf(id), 1);
};

export default players;
export { addPlayer, removePlayer };
