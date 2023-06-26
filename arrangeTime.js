export const sortDeadline = (list)=>{
    let listOfDeadlines = list.map(content=> content[2])
    console.log(listOfDeadlines)
    // assuming that the the list contains arrays
    listOfDeadlines.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a) - new Date(b);
      }); 
    let tasks = document.getElementById('tasks')
    for(let i =0; i<listOfDeadlines.length;i++){
      let j = 0
      while(list[j][2]!== listOfDeadlines[i]){
        j = j+1
      }
      let node = document.getElementById(`task-${list[j][0].replace(/\W/g,'_')}`)
        moveToNthChild(node,tasks,i)
    }


}
function moveToNthChild(node, parent, position) {
  const childNodes = parent.childNodes;
  const targetNode = childNodes[position]; 

  if (targetNode) {
    parent.insertBefore(node, targetNode);
  } else {
    parent.appendChild(node); // If the position is out of range, append the node to the end
  }
}