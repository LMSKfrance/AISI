// Patch example: adapt these port names to your project
export type SourcePort =
  | 'planet'
  | 'transitPlanet'
  | 'house'
  | 'timeContext'
  | 'aspectResult'
  | 'domainImpact'
  | 'decisionAnalysis'
  | 'personProfile';

export type TargetPort =
  | 'aspectA'
  | 'aspectB'
  | 'aspectTime'
  | 'houseInput'
  | 'houseAspect'
  | 'decisionAspect'
  | 'decisionDomain'
  | 'decisionTime'
  | 'finalInput'
  | 'personInput';

const VALID_CONNECTIONS: Record<SourcePort, TargetPort[]> = {
  planet: ['aspectA', 'aspectB', 'houseInput'],
  transitPlanet: ['aspectA', 'aspectB', 'houseInput'],
  house: ['houseInput'],
  timeContext: ['aspectTime', 'decisionTime'],
  aspectResult: ['houseAspect', 'decisionAspect', 'finalInput'],
  domainImpact: ['decisionDomain', 'finalInput'],
  decisionAnalysis: ['finalInput'],
  personProfile: ['personInput', 'finalInput'],
};

export function isValidPortConnection(sourcePort: SourcePort, targetPort: TargetPort) {
  return VALID_CONNECTIONS[sourcePort]?.includes(targetPort) ?? false;
}
