const createStaticVar = (text) => {
  const value = text
  return {
    type: "Static",
    isDynamicCreation: false,
    value,
  }
}

const createDynamicVar = (entityData) => {

  return {
    type: "Dynamic",
    name: entityData.name,
    placeHolder: "",
    gvsId: ""
  }
}

const convertToWordArray = (contentBlock) => {
  const wordArray = []
  const entityRanges = contentBlock.blocks[0].entityRanges
  const entityMap = contentBlock.entityMap
  let text = contentBlock.blocks[0].text.trim()
  let prevOffset = 0
  if(entityRanges.length > 0){
    entityRanges.map(({offset, length, key}) => {
      if(offset > 0){
        const preOffsetText = text.slice(prevOffset, offset);
        const staticVar = createStaticVar(preOffsetText);
        wordArray.push(staticVar)
      }
      const dynamicVar = createDynamicVar(entityMap[key].data.mention)
      wordArray.push(dynamicVar)
      prevOffset = offset+length

    })
  }

  if(prevOffset+1 <= text.length){
    const currentText = text.slice(prevOffset, text.length)
    wordArray.push(createStaticVar(currentText))
  }
   


  return wordArray

}
export default convertToWordArray;
