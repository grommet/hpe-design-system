const fetchData = function(){
        let thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
        fetch(`https://api.github.com/repos/grommet/hpe-design-system/pulls?state=closed`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let tempHistory = {};
            for(let i=0; i<Object.keys(data).length; i++){
                if(new Date(data[i].merged_at).getTime() < thirtyDaysAgo){ //if it is older than thirty days ago
                    break;
                }
                let tempString = data[i].body;
                if(tempString.includes("#### Notifications")){
                    //console.log(tempString);
                    const indexOfFirstComponent = tempString.search("#### Notifications") + 22; //where the notification part starts
                    const notifSection = tempString.slice(indexOfFirstComponent); //last half with the notif info is
                    const notifList = notifSection.split("\r\n\r\n"); //splits them into an array jumping b/w name, link, and description
                    const regExp = /\[([^)]+)\]/;
                    for (let j=0; j < Object.keys(notifList).length; j+=3){
                        let tempName = notifList[j];
                        let temp = regExp.exec(tempName);
                        let typeChange = temp[1];
                        let justName;
                        if(!(notifList[j] in tempHistory)){  //TEST THIS LOGIC, IF THERE ARE ANY NEWER UPDATES THAT ALREADY EXIST FOR IT, DONT ADD THEM
                            if(typeChange === 'Update'){
                                justName = tempName.slice('8');
                            }else if(typeChange === 'New'){
                                justName = tempName.slice('5');
                            }
                            let action = notifList[j+1].slice(1, -1);
                            tempHistory[justName] = 
                                {"type": typeChange,
                                "description": notifList[j+2],
                                "update": true,
                                "date": data[i].merged_at,
                                "action": action,
                                };
                        }
                    }
                }
            }
            window.localStorage.setItem("update-history",JSON.stringify(tempHistory));
            console.log(JSON.parse(window.localStorage.getItem("update-history")));
        })
        .catch(error => console.error(error));
}

export default fetchData;