
//Read data from json
async function fetchMen() {
    let getMales = await fetch('male_users.json');
    // let men = await getMales.json();
    
    return  getMales.json();    
}

async function fetchWomen() {
    let getFemales = await fetch('female_users.json');
    // let women =  await getFemales.json();
    return getFemales.json();    
    
}

// run main function in async
async function main() {
    const men = await fetchMen();
    const women = await fetchWomen();
    
    document.querySelector('#start').addEventListener('click', getProfiles);
    document.querySelector('#next').addEventListener('click', showProfile);
    

    // iterator
    function profileIterator(profiles) {
        let nextIndex =0;

        return {
            next: function() {
                return nextIndex < profiles.length ?
                {value: profiles[nextIndex++], done:false} :
                {done:true}
            }
        }
    }

    let profile;
    let gender;

    function getProfiles(e) {
        gender = document.querySelector('#gender').value;
        // console.log(gender);
        if (gender === 'male'){
            profile = profileIterator(men.results);
            fillProfile(profile.next().value);
        } else if(gender === 'female') {
            profile = profileIterator(women.results);
            fillProfile(profile.next().value);
        }
        
    }
    
    function showProfile(e){
        console.log('clicked')
        fillProfile(profile.next().value);
    }

   function fillProfile(data) {
        document.querySelector('#profileDisplay').innerHTML=`
        <ul class="list-group">
            <li class="list-group-item">Name: ${data.name.first} ${data.name.last}</li>
            <li class="list-group-item">Age: ${data.dob.age}</li>
            <li class="list-group-item">Location: ${data.location.city}, ${data.location.country} </li>
            <li class="list-group-item">Contact Info: ${data.email}</li>
        
    
        `

        document.querySelector('#imageDisplay').innerHTML = `<img src=${data.picture.large}>`
    }




} 

main();
