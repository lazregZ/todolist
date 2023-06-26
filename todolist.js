import {sortDeadline} from './arrangeTime.js'


document.getElementById("add").addEventListener("click", () =>{
    document.querySelector(".popup-container").style.display="flex"
})
document.getElementById("close").addEventListener("click", () =>{
    document.querySelector(".popup-container").style.display="none"})



    let projectList=[]
    let tasklist=[]
    const $select = document.querySelector('#selector')
    $select.addEventListener('change', (e)=>{
        const target = e.target.value
        selectOption(target)
    })
        // this was inside the class add, everytime i add a project/ option a new addeventlistener is assigned to the selector, the selectOption function is repeated many times

class add {
    
    constructor(taskName,projectName,deadline,description){
        this.taskName= taskName
        this.projectName= projectName
        this.deadline= deadline
        this.description= description
    }
    addToList(){
        const selector = document.querySelector("#selector")
        const tasks = document.getElementById('tasks')
        const task = document.createElement('div')

        const taskDetails =`
        <div class="task" id="task-${this.taskName.replace(/\W/g,'_')}">
                    <div class="content">
                        <p id="interfaceText">${this.taskName}</p>
                        <div>
                            <button class="Delete">Delete</button>
                            <button class="butDetails">Details</button>
                        </div>
                        <input type="checkbox" id="checkbox">
                 </div>
                 <div class="hiddenDetails">
                    <div class="task-info Details" class="taskTitle">
                    <label for ="Taskname ">Task name:</label>
                    <input type="text" value="${this.taskName}" id="Taskname" readonly>
                    </div>
                    <div class="task-info Details">
                        <label for ="projectname ">Project name:</label>
                        <input type="text"  id="projectname" value="${this.projectName}" readonly>
                    </div>
                    <div class="task-info Details">
                        <label for="deadLine">Deadline:</label>
                        <input type="date" id="deadLine" value="${this.deadline}" readonly>
                    </div>
                    <div class="task-info textarea Details">
                        <label for="taskdescription">Description:</label>
                        <textarea id="taskdescription"  readonly>${this.description}
                        </textarea>
                    </div>
                    <div class="escapeButtons">
                    <button class="edit">Edit</button>
                    <button class="cancel" >Cancel</button>
                    </div>

                 </div>
        </div>         `

        tasklist.push([this.taskName,this.projectName,this.deadline,this.description])
        if(projectList.includes(this.projectName) === false && this.projectName!== ""){
            projectList.push(this.projectName)
            const option = document.createElement('option')
            option.innerHTML= this.projectName
            option.setAttribute("value",this.projectName)
            selector.appendChild(option)
        }
     
        // array is capitalized
  
        console.log(projectList)
        task.innerHTML= taskDetails
       

        tasks.appendChild(task)
        this.delete()
        this.details()    
        this.cancel()
        this.edit()
        this.checkbox()

    }

    delete(){
        document.querySelectorAll(".Delete").forEach((button)=> button.addEventListener("click", (e)=>{
            const target = e.target
            target.closest(".task").remove()

    }))}

    details(){
        document.querySelectorAll(".butDetails").forEach((button)=> button.addEventListener("click", (e)=>{
            const target = e.target
            target.parentNode.parentNode.nextElementSibling.style.display="flex"
            target.closest('.content').style.display="none"
    }))}

    cancel() {
        document.querySelectorAll(".cancel").forEach((button) => {
          button.addEventListener("click", (e) => {
            const target = e.target;
            target.closest(".task").querySelector(".hiddenDetails").style.display = "none";
            target.closest(".task").querySelector(".content").style.display = "flex";
            // go up to task then look for its children!!!
          });
        });
      }
    edit(){
        document.querySelectorAll(".edit").forEach((button) => {
            button.addEventListener("click", (e) => {
            const target = e.target;
            
            if(target.innerHTML ==="Edit"){
            target.innerHTML = "Done"
            const readonlyInputs = target.closest(".task").querySelector(".hiddenDetails").querySelectorAll('input[readonly], textarea[readonly] ');

            readonlyInputs.forEach((input)=>{
            input.removeAttribute('readonly')
             // use the removeAttribute!!!

            })}
            
            else if (target.innerHTML !=="Edit"){   
                
                target.innerHTML = "Edit";
                const allInputs = target.closest(".task").querySelector(".hiddenDetails").querySelectorAll('input, textarea');
                // this.update();
                allInputs.forEach((input)=>{
                input.setAttribute('readonly','true')})
                
 
            }
                
            })})

        
    }

    checkbox(){
        document.querySelectorAll('input[type="checkbox"]').forEach((checkBox)=>{
            checkBox.addEventListener('click', (e)=>{
                const target = e.target
                if(target.checked){
                    // target.checked and not target.value === on or off or sum bs
                const bar = document.createElement('div')
                bar.setAttribute("class","bar")
                target.closest(".content").appendChild(bar)
                target.closest(".content").querySelector('#interfaceText').style.backgroundColor= "rgba(255,255,255,0.3)"
                // .queryselector and not document.queryselector
                }
                else{
                    target.closest(".content").querySelector('#interfaceText').style.backgroundColor= "white"
                    target.closest(".content").querySelector('.bar').remove()

                }
                

            })

        })
    }
    // there's still an update function!!!
}
function selectOption(projectOption){
    console.log(document.querySelectorAll(".task"))
    
    if(projectOption === "ShowAll"){
        document.querySelectorAll(".task").forEach((node)=>{
            node.style.display= "block"
        })
        return 
        // if  and else or if and return
    }

    document.querySelectorAll(".task").forEach((node)=>{
        node.style.display= "none"
        // pay attention, you're using queryselectorAll, so you're returning a nodelist not a asingle element

    })
    const projectTasks= tasklist.filter(task => task[1]=== projectOption)
    projectTasks.forEach(projectask => {
    document.querySelector(`#task-${projectask[0].replace(/\W/g,'_')}`).style.display = "block"

    })

}
    

let taskList=[]

const submit = document.getElementById("submit")


submit.addEventListener("click", (e)=>{e.preventDefault()
const taskName = document.getElementById("task-name").value
const projectName = document.getElementById("project-name").value
const deadline = document.getElementById("deadline").value
const description = document.getElementById("task-description").value
const addNewTask = new add(taskName, projectName, deadline, description)
 

    document.querySelector(".popup-container").style.display="none"
    addNewTask.addToList()
    if(tasklist.length>1){
        sortDeadline(tasklist)
    }
    

})


