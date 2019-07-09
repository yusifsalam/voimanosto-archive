interface EventType {
  [key: string]: number[]
}

interface EquipmentType {
  [key: string]: EventType
}

interface SexType {
  [key: string]: EquipmentType
}

const ipf_params: SexType = {
  M: {
    Raw: {
      SBD: [310.67, 857.785, 53.216, 147.0835],
      S: [123.1, 363.085, 25.1667, 75.4311],
      B: [86.4745, 259.155, 17.57845, 53.122],
      D: [103.5355, 244.765, 15.3714, 31.5022]
    },
    'Single-Ply': {
      SBD: [387.265, 1121.28, 80.6324, 222.4896],
      S: [150.485, 446.445, 36.5155, 103.7061],
      B: [133.94, 441.465, 35.3938, 113.0057],
      D: [110.135, 263.66, 14.996, 23.011]
    }
  },
  F: {
    Raw: {
      SBD: [125.1435, 228.03, 34.5246, 86.8301],
      S: [50.479, 105.632, 19.1846, 56.2215],
      B: [25.0485, 43.848, 6.7172, 13.952],
      D: [47.136, 67.349, 9.1555, 13.67]
    },
    'Single-Ply': {
      SBD: [176.58, 373.315, 48.4534, 110.0103],
      S: [74.6855, 171.585, 21.9475, 52.2948],
      B: [49.106, 124.209, 23.199, 67.4926],
      D: [51.002, 69.8265, 8.5802, 5.7258]
    }
  }
}

interface Wilks {
  [key: string]: number[]
}
const wilks_params: Wilks = {
  M: [
    -216.0475144,
    16.2606339,
    -0.002388645,
    -0.00113732,
    7.01863e-6,
    -1.291e-8
  ],
  F: [
    594.31747775582,
    -27.23842536447,
    0.82112226871,
    -0.00930733913,
    4.731582e-5,
    -9.054e-8
  ]
}

export function calculatePoints(
  total: number,
  bw: number,
  sex: string,
  equipment: string,
  eventType: string
): number {
  if (bw === 0) alert('Please enter bodyweight')
  if (total === 0) alert('Please enter total')
  let constants = ipf_params[sex][equipment][eventType]
  let points =
    500 +
    (100 * (total - (constants[0] * Math.log(bw) - constants[1]))) /
      (constants[2] * Math.log(bw) - constants[3])
  return Math.round(points * 100) / 100
}

export function calculateWilks(total: number, bw: number, sex: string): number {
  let constants = wilks_params[sex]
  let wilks =
    (total * 500) /
    (constants[0] +
      constants[1] * bw +
      constants[2] * Math.pow(bw, 2) +
      constants[3] * Math.pow(bw, 3) +
      constants[4] * Math.pow(bw, 4) +
      constants[5] * Math.pow(bw, 5))
  return Math.round(wilks * 100) / 100
}
