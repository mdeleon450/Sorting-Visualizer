import SortingVisualizer from "../Sorting Visualizer/SortingVisualizer";

export function getBubbleSortAnimations(array){
    const animations =[];
    if(array.length <= 1) return array;
    bubbleSortHelper(array, animations)
    return animations
}

function bubbleSortHelper(array, animations){
    let n = array.length;
    for(let i = 0; i < n-1; i++){
        for(let j = 0; j < n-i-1; j++){
            // Push them once to change color
            animations.push([j, j+1]);
            // Push them again to revert to normal
            animations.push([j, j+1]);
            if (array[j] > array[j+1]){
                //Swap images to indicate sorting 
                animations.push([j, j+1]);
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return animations;
}

export function getInsertionSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    insertionSortHelper(array, animations);
    return animations;
}

function insertionSortHelper(array, animations){
    let n = array.length;
    for(let i = 1; i < n; ++i){
        let key = array[i];
        let j = i-1;
        animations.push([j,i]);
        animations.push([j,i]);
        while(j >= 0 && array[j] > key){
            animations.push([j+1,j])
            array[j+1] = array[j];
            j = j-1;
        }
        array[j+1] = key;
    }
}

export function getSelectionSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    selectionSortHelper(array, animations);
    return animations;
}

function selectionSortHelper(array, animations){
    const n = array.length;
    for(let i = 0; i < n-1; i++){
        let min_Idx = i;
        for(let j = i+1; j < n; j++){
            animations.push([j,min_Idx]);
            animations.push([j,min_Idx]);
            if(array[j] < array[min_Idx]){
                min_Idx = j;
            }
        }
        animations.push([min_Idx,i]);
        let temp = array[min_Idx];
        array[min_Idx] = array[i];
        array[i] = temp;
    }
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}
