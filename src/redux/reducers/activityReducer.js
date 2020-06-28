import {
  CARD,
  GAME_UPDATE,
} from "../actions/activityActions";

import {
  NEW_ROOM,
} from "../actions/actions";

const initActivity = {
  playersCount: 0,
  status: null,
  winnerTeam: null,
  teams: [],
  playerTeams: {},
  step: {
    card:{}
  },
  maxPoints: ''
};

function mapPlayersToTeams(teams){
  let playerTeams = {}
  teams.forEach(team => {
    team.players.forEach(player =>{
      playerTeams[player] = team.id
    })
  })
  return playerTeams;
}

function findTopTeam(teams) {
  if(teams.length === 0){
    return undefined;
  }
  const reducer = (top, team) =>
    top.points < team.points ? team : top;
  return teams.reduce(reducer).id;
}

function activityReducer(game = initActivity, action) {
  switch (action.type) {
    case NEW_ROOM:
      return initActivity;
    case CARD:
      return {
        ...game,
        step: {
          ...game.step,
          card: action.card,
        },
      };
    case GAME_UPDATE:
      return {
        ...action.gameUpdate,
        topTeam: findTopTeam(action.gameUpdate.teams),
        playerTeams: mapPlayersToTeams(action.gameUpdate.teams)
      };
    default:
      return game;
  }
}

export default activityReducer;
