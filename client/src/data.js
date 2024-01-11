const equipmentListTotal = ['assisted', 'band', 'barbell', 'body weight', 'bosu ball', 'cable', 'dumbbell', 'elliptical machine', 'ez barbell', 'hammer', 'kettlebell', 'leverage machine', 'medicine ball', 'olympic barbell', 'resistance band', 'roller', 'rope', 'skierg machine', 'sled machine', 'smith machine', 'stability ball', 'stationary bike', 'stepmill machine', 'tire', 'trap bar', 'upper body ergometer', 'weighted', 'wheel roller']
const bodyPartsTotal = ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']
const bodyPartsList = ['back', 'cardio', 'chest', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']
const compoundBodyPartsList = ['back', 'cardio', 'chest', 'upper legs', 'waist']
const targetList = ['abductors', 'abs', 'adductors', 'biceps', 'calves', 'cardiovascular system', 'delts', 'forearms', 'glutes', 'hamstrings', 'lats', 'levator scapulae', 'pectorals', 'quads', 'serratus anterior', 'spine', 'traps', 'triceps', 'upper back']
const equipmentList = ['band', 'barbell', 'body weight', 'cable', 'dumbbell', 'resistance band', 'rope', 'smith machine', 'stationary bike', 'weighted']

const targetListConvert = targetList.map(target => {
  return { label: target,  value: target }
})
const bodyPartsListConvert = bodyPartsList.map(bodyPart => {
  return  { label: bodyPart.substring(0,1).toUpperCase() + bodyPart.substring(1),  value: bodyPart }
})
const compoundBodyPartsListConvert = compoundBodyPartsList.map(compoundBodyPart => {
  return { label: compoundBodyPart,  value: compoundBodyPart }
})
const equipmentListConvert = equipmentList.map(equipment => {
  return { label: equipment.substring(0,1).toUpperCase() + equipment.substring(1),  value: equipment }
})

const bodyPartsListSelect = [
  { label: 'Back', value: 'back' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Chest', value: 'chest' },
  { label: 'Neck', value: 'neck' },
  { label: 'Shoulders', value: 'shoulders' },
  { label: 'Arms', value: 'upper arms' },
  { label: 'Legs', value: 'upper legs' },
  { label: 'Waist', value: 'waist' }
]

const equipmentListSelect = [
  { label: 'Band', value: 'band' },
  { label: 'Barbell', value: 'barbell' },
  { label: 'Body Weight', value: 'body weight' },
  { label: 'Cable', value: 'cable' },
  { label: 'Dumbbell', value: 'dumbbell' },
  { label: 'Resistance Band', value: 'resistance band' },
  { label: 'Rope', value: 'rope' },
  { label: 'Smith Machine', value: 'smith machine' },
  { label: 'Stationary Bike', value: 'stationary bike' },
  { label: 'Weighted', value: 'weighted' }
]

const levelListSelect = [
  { label: "Beginner", value: 1 },
  { label: "Intermediate", value: 2 },
  { label: "Expert", value: 3 }
]

export { bodyPartsListSelect, equipmentListSelect, levelListSelect }