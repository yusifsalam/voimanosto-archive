interface EventType {
  [key: string]: number[],
}

interface EquipmentType {
  [key: string]: EventType,
}

interface SexType {
  [key: string]: EquipmentType,
}

export const ipf_params: SexType = {
    "M": {
      "Raw": {
        "SBD": [310.67, 857.785, 53.216, 147.0835],
        "S": [123.1000, 363.0850, 25.1667, 75.4311],
        "B": [86.4745, 259.155, 17.57845, 53.122],
        "D": [103.5355, 244.7650, 15.3714, 31.5022],
      },
      "Single-Ply": {
        "SBD": [387.265, 1121.28, 80.6324, 222.4896],
        "S": [150.4850, 446.4450, 36.5155, 103.7061],
        "B": [133.94, 441.465, 35.3938, 113.0057],
        "D": [110.1350, 263.6600, 14.9960, 23.0110],
      }
    },
    "F": {
      "Raw": {
        "SBD": [125.1435, 228.03, 34.5246, 86.8301],
        "S": [50.4790, 105.6320, 19.1846, 56.2215],
        "B": [25.0485, 43.848, 6.7172, 13.952],
        "D": [47.1360, 67.3490, 9.1555, 13.6700],
      },
      "Single-Ply": {
        "SBD": [176.58, 373.315, 48.4534, 110.0103],
        "S": [74.6855, 171.5850, 21.9475, 52.2948],
        "B": [49.106, 124.209, 23.199, 67.4926],
        "D": [51.0020, 69.8265, 8.5802, 5.7258],
      }
    }
  };

interface Wilks {
  [key: string] : number[]
}
export const wilks_params: Wilks = {
    "M" : [-216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863E-06, -1.291E-08],
    "F" : [594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582E-05, -9.054E-08]
}