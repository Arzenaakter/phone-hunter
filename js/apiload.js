const loadPhonesData = async(searchText ,dataLimit)=>{
    const url =` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhones(data.data, dataLimit);
}
const showPhones = (phones, dataLimit) =>{
    // console.log(phones)
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText=' ';


    // display 6phone
  
// show all
            const showAll = document.getElementById('Show-All-section');
            if(dataLimit && phones.length > 6){
                phones = phones.slice(0,6);
                showAll.classList.remove('d-none');
                
            }
            else{
                showAll.classList.add('d-none');
            }



    // warning
    const noPhone = document.getElementById('no-phone');
    if(phones.length===0){
        noPhone.classList.remove('d-none');
    }
    else
    {
        noPhone.classList.add('d-none');
    }


    for(let phone of phones){
        // console.log(phone.slug)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100">
            <img src=" ${phone.image}" class="card-img-top p-4 h-75" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button class="btn btn-primary" onclick="loadDetails('${phone.slug}')"  data-bs-toggle="modal" data-bs-target="#phoneModal">Details</button>

           

          
        </div>
      </div>
       
        `;
        phonesContainer.appendChild(div);
    }
    toggleSpninner(false);
}

// data loading process
 const processLoading = (dataLimit)=>{
    toggleSpninner(true);
    const phoneSearchFiled = document.getElementById('phone-field');
    const searchField = phoneSearchFiled.value ;
    loadPhonesData(searchField,dataLimit);

 }
// input field enter key

document.getElementById('phone-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processLoading(6);
      
    }
});

//  phone srch button
document.getElementById('phone-search').addEventListener('click', function(){
    processLoading(6);

})


 const toggleSpninner = isLoading =>{
    const toggleLoading = document.getElementById('loading');
    if(isLoading){
        toggleLoading.classList.remove('d-none');

    }
    else{
        toggleLoading.classList.add('d-none');

    }
 }
// show all button
document.getElementById('show-all-btn').addEventListener('click',function(){
    
    processLoading();
})

//  loadDetails button
const loadDetails= async (id)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}` ;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

// modal
const displayPhoneDetails = phone =>{
    // console.log(phone);
    const modalTTitle = document.getElementById('phoneModalLabel');
    modalTTitle.innerText = phone.name;



    const phoneDetails = document.getElementById('phone-details') ;
    phoneDetails.innerHTML =`
    <p>Phone Relise Date: ${phone.releaseDate?phone.releaseDate: 'No date' } </p>
    <p> Other: ${phone.others? phone.others.Bluetooth : 'No Bluthooth'}</p>
    `
}

// loadPhonesData('oppo');