const equipmentListTotal = ['assisted', 'band', 'barbell', 'body weight', 'bosu ball', 'cable', 'dumbbell', 'elliptical machine', 'ez barbell', 'hammer', 'kettlebell', 'leverage machine', 'medicine ball', 'olympic barbell', 'resistance band', 'roller', 'rope', 'skierg machine', 'sled machine', 'smith machine', 'stability ball', 'stationary bike', 'stepmill machine', 'tire', 'trap bar', 'upper body ergometer', 'weighted', 'wheel roller']
const bodyPartsTotal = ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']
const bodyPartsList = ['back', 'cardio', 'chest', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist']
const compoundBodyPartsList = ['back', 'cardio', 'chest', 'upper legs', 'waist']
const targetList = ['abductors', 'abs', 'adductors', 'biceps', 'calves', 'cardiovascular system', 'delts', 'forearms', 'glutes', 'hamstrings', 'lats', 'levator scapulae', 'pectorals', 'quads', 'serratus anterior', 'spine', 'traps', 'triceps', 'upper back']
const equipmentList = ['band', 'barbell', 'body weight', 'cable', 'dumbbell', 'resistance band', 'rope', 'smith machine', 'stationary bike', 'weighted']

const targetListSelect = targetList.map(target => {
  return { label: target,  value: target }
})
const bodyPartsListSelect = bodyPartsList.map(bodyPart => {
  return { label: bodyPart,  value: bodyPart }
})
const compoundBodyPartsListSelect = compoundBodyPartsList.map(compoundBodyPart => {
  return { label: compoundBodyPart,  value: compoundBodyPart }
})
const equipmentListSelect = equipmentList.map(equipment => {
  return { label: equipment,  value: equipment }
})
const levelListSelect = [{ label: "all", value: [1, 2, 3]}, { label: "beginner", value: 1 }, { label: "intermediate", value: 2 }, { label: "expert", value: 3 } ]

export { bodyPartsListSelect, compoundBodyPartsListSelect, equipmentListSelect, levelListSelect }