// Patch example: merge into your existing node registry
import PersonNode from './components/PersonNode';
import FinalResultsNode from './components/FinalResultsNode';

// import your other existing nodes here
// import NatalPlanetNode from './components/NatalPlanetNode';
// import TransitPlanetNode from './components/TransitPlanetNode';
// ...

export const nodeTypes = {
  // natalPlanet: NatalPlanetNode,
  // transitPlanet: TransitPlanetNode,
  // house: HouseNode,
  // timeWindow: TimeWindowNode,
  // aspect: AspectNode,
  // houseActivation: HouseActivationNode,
  // decisionScore: DecisionScoreNode,
  finalResults: FinalResultsNode,
  person: PersonNode,
};
