const fetchData = function(){
        let thirtyDaysAgo = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);
        fetch(`https://api.github.com/repos/grommet/hpe-design-system/pulls?state=closed`)
        .then(response => response.json())
        .then(data => {
            console.log("FETCHINGG");
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
                    //console.log(notifList);
                    const regExp = /\[([^)]+)\]/;
                    for (let j=0; j < Object.keys(notifList).length; j+=3){
                        let tempName = notifList[j].trim();
                        let temp = regExp.exec(tempName);
                        let typeChange = temp[1].trim();
                        let justName;
                        if(!(notifList[j] in tempHistory)){  //TEST THIS LOGIC, IF THERE ARE ANY NEWER UPDATES THAT ALREADY EXIST FOR IT, DONT ADD THEM
                            console.log("runnin");
                            if(typeChange === 'Update'){
                                justName = tempName.slice('8').trim();
                            }else if(typeChange === 'New'){
                                justName = tempName.slice('5').trim();
                            }

                            let sectionArray = notifList[j+1].slice(1, -1).split("][");
                            let finalSectionlist = [];
                            let action = "";
                            if(Object.keys(sectionArray).length === 1){
                                action = "#" + sectionArray[0].trim().replace(/\s+/g, '-').toLowerCase();
                            }
                            for(let i=0; i< Object.keys(sectionArray).length; i++){
                                finalSectionlist[i] = sectionArray[i].charAt(0).toUpperCase() + sectionArray[i].slice(1).toLowerCase();
                            }

                            tempHistory[justName] = 
                                {"type": typeChange,
                                "description": notifList[j+2].slice(1, -1),
                                "date": data[i].merged_at,
                                "sections": sectionArray,
                                "action": action,
                                };
                        }
                    }
                }
            }
            window.localStorage.setItem("update-history",JSON.stringify(tempHistory)); //completely refreshes it
            //console.log(JSON.parse(window.localStorage.getItem("update-history")));
        })
        .catch(error => console.error(error));
}

export default fetchData;