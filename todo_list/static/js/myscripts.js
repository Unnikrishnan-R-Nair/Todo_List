
// HOME 

// message timer 

if (document.querySelector('.alert-message')) {
    setTimeout(function(){
        document.querySelector('.alert-message button').click();
    },2000)
}


// task length controller

document.querySelectorAll('.table tbody tr td:nth-of-type(2) span').forEach((item)=>{
    let taskTitle = item.innerText
    if (taskTitle.length >= 20) {
        item.innerHTML = taskTitle.slice(0, 17) + '...'
    } 
})

// delete-popup task length

document.querySelectorAll('.delete-popup p:nth-of-type(2) span').forEach((item)=>{
    let deleteTaskText = item.innerText
    if (deleteTaskText.length > 20){
        item.innerText = deleteTaskText.slice(0, 17) + '...'
    }
})

// username and logout button inline padding

let name = document.querySelector('.username-span .username').innerText

let displayName = ''
if (name.length >= 12) {

    displayName = name.slice(0, 10) + '...';

} else {
    displayName = name;
}

document.querySelector('.username-span .username').innerText = displayName

let userNameSpanWidth = 89 + displayName.length


console.log(userNameSpanWidth)

let inlinePadding = userNameSpanWidth / 4
console.log(inlinePadding)

let logoutPaddingInline = window.getComputedStyle(document.querySelector('.logout-btn')).paddingInline;
console.log(logoutPaddingInline)
console.log(typeof logoutPaddingInline)

if (displayName.length > 6) {

    let addLength = displayName.length - 6
    console.log(addLength)

    if (addLength < 6){
        document.querySelector('.logout-btn').style.paddingInline = 4.55*addLength + inlinePadding + 'px';
    } else {
        document.querySelector('.logout-btn').style.paddingInline = 3*addLength + inlinePadding + 'px';
    }

} else {

    let subLength = 6 - displayName.length
    if(displayName.length > 4) {
        document.querySelector('.logout-btn').style.paddingInline =  inlinePadding - 4*subLength + 'px';
            
        
    }
}



// logout button

document.querySelector('.username-span').addEventListener('click', function(e) {
    
    e.stopPropagation();

    document.querySelectorAll('.mobile-button').forEach((item)=>{
        item.style.display = 'none'
    })

    document.querySelectorAll('.table tr').forEach((eachTr)=>{
        
        eachTr.querySelectorAll('td').forEach((eachTd)=>{
            
            eachTd.style.paddingBlock = '8px';
        })
        eachTr.classList.remove('activeTr');
        
    })

    document.querySelector('.logout-btn').classList.toggle('d-none');
    

})

document.querySelector('.fa-solid.fa-caret-down').addEventListener('click', function(e){
    e.stopPropagation();
    document.querySelectorAll('.mobile-button').forEach((item)=>{
        item.style.display = 'none'
    })

    document.querySelectorAll('.table tr').forEach((eachTr)=>{
        
        eachTr.querySelectorAll('td').forEach((eachTd)=>{
            
            eachTd.style.paddingBlock = '8px';
        })
        eachTr.classList.remove('activeTr');
        
    })

    document.querySelector('.logout-btn').classList.toggle('d-none');
    

})

document.querySelector('.app-div').addEventListener('click', function(e){
    e.stopPropagation();
    document.querySelector('.logout-btn').classList.add('d-none');
    
}) 


// strike-effect

document.querySelectorAll('.js-complete-status').forEach((elem) => {
    if (elem.querySelector('span').innerHTML === 'Completed') {
        //elem.parentElement.style.textDecoration = 'line-through';
        elem.parentElement.style.setProperty('--displayValue', 'block');

    }
})


// bootstrap tooltip

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))



// delete confirmation

document.querySelectorAll('.delete-button').forEach(function(button, index){
    button.addEventListener('click', function(e){
        
        let todoId = button.dataset.todoId
        //console.log(todoId)

        document.querySelector(`#delete-confirm-${todoId}`).classList.remove('d-none');
        document.querySelector(`#delete-confirm-${todoId}`).classList.add('active-div');

        document.querySelector('.delete-confirm.active-div .delete-popup').classList.add('active-popup');
        
    });
});

document.querySelectorAll('.cancel-button').forEach(function(button){

    //console.log(button.parentElement.parentElement.parentElement)
    
    button.addEventListener('click', function(e){
        if (button.parentElement.parentElement.parentElement.classList.contains('active-div')) {

            let todoId = button.dataset.todoId;
            //console.log(todoId)
            document.querySelector(`#delete-confirm-${todoId}`).classList.add('d-none');
            document.querySelector(`#delete-confirm-${todoId}`).classList.remove('active-div');

            document.querySelector(`#delete-confirm-${todoId} .delete-popup`).classList.remove('active-popup');
            
        }
                
    });
});



// task status selection

document.querySelector('.all_button').addEventListener('click', function(e){

    document.querySelectorAll('.table thead tr td.status-heading div a').forEach((item)=>{
        item.classList.remove('active');
    })

    document.querySelectorAll('.all_task').forEach((task)=>{
        task.classList.remove('d-none');
    })

    document.querySelectorAll('.pending_task').forEach((task)=>{
        task.classList.add('d-none');
    })

    document.querySelectorAll('.completed_task').forEach((task)=>{
        task.classList.add('d-none');
    })

    this.classList.add('active');
    
})

document.querySelector('.pending_button').addEventListener('click', function(e){

    document.querySelectorAll('.table thead tr td.status-heading div a').forEach((item)=>{
        item.classList.remove('active');
    })


    document.querySelectorAll('.pending_task').forEach((task)=>{
        task.classList.remove('d-none');
    })

    document.querySelectorAll('.all_task').forEach((task)=>{
        task.classList.add('d-none');
    })

    document.querySelectorAll('.completed_task').forEach((task)=>{
        task.classList.add('d-none');
    })

    document.querySelector('.pending_button').classList.add('active')
    
})

document.querySelector('.completed_button').addEventListener('click', function(e){

    document.querySelectorAll('.table thead tr td.status-heading div a').forEach((item)=>{
        item.classList.remove('active');
    })

    document.querySelectorAll('.completed_task').forEach((task)=>{
        task.classList.remove('d-none');
    })

    document.querySelectorAll('.all_task').forEach((task)=>{
        task.classList.add('d-none');
    })

    document.querySelectorAll('.pending_task').forEach((task)=>{
        task.classList.add('d-none');
    })

    this.classList.add('active');
    
})



// mobile view

function mobileView() {


    window.addEventListener('resize', function(e){
        
        if(window.innerWidth < 768) {
            //document.querySelector('.more-option-column').classList.add('hide-column')

            document.querySelectorAll('.table th:nth-of-type(4)').forEach((item)=>{
                item.classList.add('d-none')
            })
            document.querySelectorAll('.table td:nth-of-type(4)').forEach((item)=>{
                item.classList.add('d-none')
            }) 
            
            document.querySelector('.table tr th:nth-of-type(3)').innerHTML = 'Status'
            
        } else if(window.innerWidth >= 768){
            //document.querySelector('.more-option-column').classList.remove('hide-column')

            document.querySelectorAll('.table th:nth-of-type(4)').forEach((item)=>{
                item.classList.remove('d-none')
            })
            document.querySelectorAll('.table td:nth-of-type(4)').forEach((item)=>{
                item.classList.remove('d-none')
            }) 

            document.querySelectorAll('.mobile-button').forEach((item)=>{
                item.style.display = 'none'
            })
            
            document.querySelectorAll('tbody tr').forEach((item)=>{
                item.querySelectorAll('td').forEach((eachTd)=>{
                    eachTd.style.paddingBlock = '8px';
                })
            })
            
            
            document.querySelector('.table tr th:nth-of-type(3)').innerHTML = 'Status'
        }

        //if (window.innerWidth > 767){
            
        //    location.reload();
        //}


    })


    if (window.innerWidth > 767) {
        //document.querySelector('.more-option-column').classList.remove('hide-column');

        document.querySelectorAll('.table th:nth-of-type(4)').forEach((item)=>{
            item.classList.remove('d-none')
        })
        document.querySelectorAll('.table td:nth-of-type(4)').forEach((item)=>{
            item.classList.remove('d-none')
        })  

        document.querySelectorAll('.mobile-button').forEach((item)=>{
            item.style.display = 'none'
        })

        document.querySelectorAll('tbody tr').forEach((item)=>{
            item.querySelectorAll('td').forEach((eachTd)=>{
                eachTd.style.paddingBlock = '8px';
            })
        })
        

        document.querySelector('.table tr th:nth-of-type(3)').innerHTML = 'Status'


    } else if(window.innerWidth <= 767){
        //document.querySelector('.more-option-column').classList.add('hide-column');

        document.querySelectorAll('.table th:nth-of-type(4)').forEach((item)=>{
            item.classList.add('d-none')
        })
        document.querySelectorAll('.table td:nth-of-type(4)').forEach((item)=>{
            item.classList.add('d-none')
        }) 

        
        document.querySelector('.table tr th:nth-of-type(3)').innerHTML = 'Status'
    }



    // all task 
    
    document.querySelectorAll('.table .js-strike-through').forEach(function(elem, index) {
        elem.addEventListener('click', function(e){

            document.querySelector('.logout-btn').classList.add('d-none');

            if(window.innerWidth <= 767){

                e.stopPropagation();

                if (elem.classList.contains(`activeTr`)) {
                    elem.querySelector('td .mobile-button').style.display = 'none';
                    elem.querySelectorAll('td').forEach((eachTd)=>{
                        eachTd.style.paddingBlock = '8px';
                    })
                    elem.classList.remove('activeTr');

                } else {

                    
                    document.querySelectorAll('.table .js-strike-through').forEach((eachTr, index)=>{

                        eachTr.querySelector('td .mobile-button').style.display = 'none';

                        eachTr.querySelectorAll('td').forEach((eachTd)=>{
                            eachTd.style.paddingBlock = '8px';
                        });
                        
                        eachTr.classList.remove(`activeTr`)
                    });
                    

                    elem.querySelectorAll('td').forEach(function(item){
                        item.style.paddingBlock = '15px';
                    });

                    this.classList.add(`activeTr`);

                    elem.querySelector('td .mobile-button').style.display = 'flex';
        

                    
                }
            }    
            
        });
    });

    document.querySelector('.app-div').addEventListener('click', function(e){

        e.stopPropagation();

        document.querySelectorAll('.table .js-strike-through td .mobile-button').forEach((item)=>{
            item.style.display = 'none';
        });

        document.querySelectorAll('.table .js-strike-through').forEach((eachTr, index)=>{
            eachTr.querySelectorAll('td').forEach((eachTd)=>{
                eachTd.style.paddingBlock = '8px';
            });
            eachTr.classList.remove(`activeTr`)
        });
        
    })
    
    
    
    // pending task

    document.querySelectorAll('.table .pending_task').forEach(function(elem){
        elem.addEventListener('click', function(e) {
            //elem.querySelector('td input[type="checkbox"]').click()
            
            
            document.querySelector('.logout-btn').classList.add('d-none');
            
            if (window.innerWidth <= 767) {

                e.stopPropagation();
                
                if (elem.classList.contains('activeTr')) {

                    elem.querySelector('td .mobile-button').style.display = 'none';
                    elem.querySelectorAll('td').forEach((eachTd)=>{
                        eachTd.style.paddingBlock = '8px';
                    })
                    elem.classList.remove('activeTr');

                } else {

                    document.querySelectorAll('.table .pending_task').forEach(function(eachTr){
                        eachTr.querySelector('td .mobile-button').style.display = 'none';
                        eachTr.querySelectorAll('td').forEach(function(eachTd){
                            eachTd.style.paddingBlock = '8px';
                        })
                        eachTr.classList.remove('activeTr'); 
                    })

                    elem.querySelector('td .mobile-button').style.display = 'flex';
                    elem.classList.add('activeTr')
                    elem.querySelectorAll('td').forEach((eachTd)=>{
                        eachTd.style.paddingBlock = '15px';
                    })
                }
            }


        })
    })

    document.querySelector('.app-div').addEventListener('click', function(e){

        e.stopPropagation();

        document.querySelectorAll('.table .pending_task td .mobile-button').forEach((item) => {
            item.style.display = 'none';
        });

        document.querySelectorAll('.table .pending_task').forEach(function(eachTr){
            eachTr.querySelectorAll('td').forEach((eachTd)=>{
                eachTd.style.paddingBlock = '8px';
            })
            eachTr.classList.remove('activeTr');
        })


    })


    // completed tasks

    document.querySelectorAll('.table .completed_task').forEach(function(elem){
        elem.addEventListener('click', function(e) {
            
            
            document.querySelector('.logout-btn').classList.add('d-none');
            
            
            if (window.innerWidth <= 767) {

                e.stopPropagation();
                
                if(elem.classList.contains('activeTr')) {

                    elem.querySelectorAll('td').forEach((eachTd)=>{
                        eachTd.style.paddingBlock = '8px';
                    })

                    elem.querySelector('td .mobile-button').style.display = 'none';

                    elem.classList.remove('activeTr');

                } else {
                    document.querySelectorAll('.table .completed_task').forEach(function(eachTr){
                        eachTr.querySelectorAll('td').forEach((eachTd)=>{
                            eachTd.style.paddingBlock = '8px';
                        })

                        eachTr.querySelector('td .mobile-button').style.display = 'none';

                        eachTr.classList.remove('activeTr');
                    })

                    elem.querySelectorAll('td').forEach((item)=>{
                        item.style.paddingBlock = '15px';
                    })

                    elem.querySelector('td .mobile-button').style.display = 'flex';

                    elem.classList.add('activeTr');
                    
                }
            
                
            }
        })
    })

    document.querySelector('.app-div').addEventListener('click', function(e){

        e.stopPropagation();

        document.querySelectorAll('.table .completed_task td .mobile-button').forEach((item) => {
            item.style.display = 'none';
        });

        document.querySelectorAll('.table .completed_task').forEach(function(eachTr){
            eachTr.querySelectorAll('td').forEach((eachTd)=>{
                eachTd.style.paddingBlock = '8px';
            })

            eachTr.classList.remove('activeTr');
        })


    })

}


mobileView(); 

/*
document.querySelector('.app-div').addEventListener('click', function(e){
        

    document.querySelectorAll('input[type="checkbox"]').forEach((item)=>{
        if (item.classList.contains('checked-item') && item.checked) {
            item.click();
            item.classList.remove('checked-item')
        }
    })
    
    
})
    
*/ 


