import { useEffect, useState } from 'react';

// GENERAL NOTE: The useEffect to async-function-fetch thing is where there is likely a memory leak
// I saw online that a few people were having problems fetching inside the useEffect
// so there is another way I'm going to try out after I send you this branch

const contributorCommitMessages = function(topic, currentFileName){
    console.log( `${topic  }: ${  currentFileName}` );
    const [contrMsgs, setContributorMessages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // this fetchData is grabbing the list of commits that have affected the file in total, this has the author/date/message informaiton we need
        // this also has a url in the object, which will fetch more info about the commit in general, that is the fetchFile() thing I did below
        async function fetchData(){
            try{
                // console.log('1')
                const response = await fetch(`https://api.github.com/repos/grommet/hpe-design-system/commits?path=aries-site/src/pages/${topic}/${currentFileName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error(`Invalid data format: expected an array, got ${typeof data}`);
                }
                setContributorMessages(data);
                // console.log('A', data);    
            }catch (error) {
                setError(`here${  error.message}`);
            }
        }


        // this fetch file part is going to grab more of the relevant information if we wanted to evolve it into showing which sections the changes are in
        // i call it iteratively through the commits that affected the current file in fetchData()
        // if we dont end up doing the part where we point out the sections there had been changes, i could remove this entirely
        // ^^that would also lessen the total fetches by like 60% so we defintely wouldn't have those API rate issues, because with this currently, I'm still not even running into the limiter
        async function fetchFile(i){
            try{
                // console.log('2')
                const newRes = await fetch(`${contrMsgs[i].url}`);
                if(!newRes.ok){
                    throw new Error(`Failed to fetch new data: ${newRes.status} ${newRes.statusText}`);
                }
                const fileData = await newRes.json();

                // i made a temporary array of objects, this one mimics the commit list i got from fetchData
                // but directly adds the string with the line-by-line changes in it, so I dont have to go through all the calls again to grab the string
                const temp = contrMsgs;
                fileData.files.forEach(element => {
                    if(element.filename.slice(-currentFileName.length) === currentFileName){
                        temp[i].change = element.patch;
                    }
                });
                // console.log('HI', temp);
                setContributorMessages(temp);
            }catch(error){
                setError(`over here${  error.message}`);
            }
        }

        fetchData();
        
        for(let i=0; i<contrMsgs.length; i++){
            fetchFile(i);
        }

        console.log(`the error: ${  error}`);
        
    }, []);

    // I make one more array but it only reflects the commits that have happened within the current past year this is the one I return
    // Limiting it to a year is so that it can quickly be added to a Change Log if we decide to implement it
    // In summary it holds an array of objects: each object with the commit time, author, message, and (possibly) a string of changes
    const changeLogArray = [];
    let j = 0;
    contrMsgs.forEach(element => {
        // i dont push the line-by-line into these objects when we decided not to do the sections, but if we were to add that I would add it here 
        // because it is already in contrMsgs at this point
        const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).getTime();
        const commitDate = new Date(element.commit.author.date).getTime();
        if(commitDate > oneYearAgo){
            const temp = { date: new Date(element.commit.author.date).toDateString(), string: element.commit.message };
            changeLogArray.push(temp);
            j++;
        }
    });

    console.log(changeLogArray);
    return changeLogArray;
};

export default contributorCommitMessages;