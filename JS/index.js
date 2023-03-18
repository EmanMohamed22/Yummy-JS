let row =  document.getElementById("main-row")
let id;


async function mainDishes() {
    openloading()
    let apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    let response = await apiResponse.json()
    let meal = response.meals
    display(meal)
    $(".layer").click((e)=>{
        id = e.target.id
        details(id)
    })
    closeLoading()

}
mainDishes()


 function display(meal) {
    let meals = "";
    for (let i = 0; i < meal.length; i++) {
        meals += `
        <div class="col-md-3 basic">
                        <div class="position-relative rounded-3 overflow-hidden " id="emo">
                        <div class="layer d-flex align-items-center" id="${meal[i].idMeal}">
                        <h2 class="text-dark">${meal[i].strMeal}</h2>

                        </div>
                            <img src="${meal[i].strMealThumb}" alt="" class="w-100">
                        </div>
         </div>
        `
        
        
    }
            row.innerHTML = meals
 
 }
 

 let sideNav = $(".nav").outerWidth(true)
 function close() {
    $(".side-nav").animate({left:`-${sideNav}`},500)
    $(".nav li").animate({top:"300px"},500)
    

$(".open i").removeClass("fa-xmark");
$(".open i").addClass("fa-align-justify");
 }

// function animateLi() {
//     $(".search").animate({top:"300px"},500,()=>{
//         $(".category").animate({top:"300px"},500,()=>{
//             $(".area").animate({top:"300px"},500,()=>{
//                 $(".ingredient").animate({top:"300px"},500,()=>{
//                     $(".contact").animate({top:"300px"},500)}
//             )
//         } )
//     }
//     )
// })}

 function open() {
    $(".side-nav").animate({"left": "0px"},500,()=>{
        $(".nav li").show(100)
        $(".nav li").animate({top:"0px"},500)
        
    } )
    $(".open i").removeClass("fa-align-justify");
    $(".open i").addClass("fa-xmark");
 }
 
 function openClose() {
    $(".open").click(()=>{
        if ($(".side-nav").css("left") == "0px") {
           close()
        } else {
           open() 
        }
         
    })
    
 }
openClose()
///////////////////////.............
function openloading() {
    $(".loading").fadeIn(100)
    $(".loading").css("display","flex")
}


function closeLoading() {
    $(".loading").fadeOut(100)
    $(".loading").css("display","none")
}
//////........................SEARCH////
$(".search").click(()=>{
   
   row.innerHTML = ""
   let forms =`
   <div class="search-input d-flex ">
                   <input type="text" class="form-control m-2 input1" placeholder="Search by name">
                   <input type="text" class="form-control m-2 input2" maxlength="1" placeholder="Search by first letter">
                  </div>
   `
    $("#searchCon").html(forms)
    $(".input1").keyup(()=>{
        let name = $(".input1").val();
        search(name)
    })
    $(".input2").keyup(()=>{
        let chart = $(".input2").val();
        searchByFchart(chart)
    })
    
    close()
}
)



async function search (name) {
    openloading()
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let response = await apiResponse.json()
    let meal = response.meals
    display(meal)
    $(".layer").click((e)=>{
        id = e.target.id
        details(id)
    })
    closeLoading()
}
async function searchByFchart (chart) {
    
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${chart}`)
    let response = await apiResponse.json()
    let meal = response.meals
    display(meal)
    $(".layer").click((e)=>{
        id = e.target.id
        details(id)
    })
    
}
/////////////// CATEGORY //////////////////


$(".category").click(()=>{
   row.innerHTML = "";
     document.getElementById("searchCon").innerHTML=""
    close()
getCategory()
})

async function getCategory () {
    openloading()
    let apiResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let response = await apiResponse.json()
    let meal = response.categories
    
    displayCategory(meal)
    $(".layer").click((e)=>{
        category = e.currentTarget.id
        
        clickCategory(category)
    })
    closeLoading()
}



function displayCategory(meal) {
    let meals = "";
    for (let i = 0; i < meal.length; i++) {
        meals += `
        <div class="col-md-3 position-relative overflow-hidden rounded-3">
        <div class="layer text-center" id="${meal[i].strCategory}">
            <h3>${meal[i].strCategory}</h3>
            <p>${meal[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
        </div>
        <img src="${meal[i].strCategoryThumb}" alt="" class="w-100">
        </div>

        `
        
    }
            row.innerHTML = meals
 
 }

 async function clickCategory(category){
    openloading()
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let response = await apiResponse.json()
    console.log(response.meals);
    display(response.meals)
    $(".layer").click((e)=>{
        id = e.target.id
        details(id)
    })
    closeLoading()
}

/////////////...............AREA/////////////
$(".area").click(()=>{
    row.innerHTML = "";
    document.getElementById("searchCon").innerHTML=""
    close()
    getArea()
})

async function getArea () {
    openloading()
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`   )
    let response = await apiResponse.json()
    console.log(response.meals);

     displayArea(response.meals)
     $(".area").click((e)=>{
        area = e.currentTarget.id
        console.log(area);
        clickArea(area)
    })
    closeLoading()
}


function displayArea(country) {
    let countries = "";
    for (let i = 0; i < country.length; i++) {
        countries += `
        <div class="col-md-3">
           <div class="text-center area" id="${country[i].strArea}">
           <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
               <h2 class="text-white">${country[i].strArea}</h2>
        </div>
      </div>
        `
        
    }
            row.innerHTML = countries
 
 }

 async function clickArea(area){
    openloading()
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let response = await apiResponse.json()
    console.log(response);
    display(response.meals)
    $(".layer").click((e)=>{
        id = e.target.id
        details(id)
    })
    closeLoading()
}


 //////////...........//////////ingredient///
$(".ingredient").click(()=>{
    row.innerHTML = "";
    document.getElementById("searchCon").innerHTML=""
    close()
    getIngredient()
})

async function getIngredient () {
    openloading()
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list    `   )
    let response = await apiResponse.json()
    console.log(response.meals);

     displayIngredient(response.meals.slice(0,24))
     $(".ingred").click((e)=>{
        ingred = e.currentTarget.id
        console.log(ingred);
        clickIngred(ingred)
    })
    closeLoading()
}


function displayIngredient(meal) {
    let meals = "";
    for (let i = 0; i < meal.length; i++) {
        meals += `
        <div class="col-md-3">
           <div class="text-center ingred" id="${meal[i].strIngredient}">
           <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
               <h2 class="text-white">${meal[i].strIngredient}</h2>
               <p class ="text-white">${meal[i].strDescription?.split(" ").slice(0,15).join(" ")}</p>
        </div>
      </div>
        `
        
    }
            row.innerHTML = meals
 
 }

 async function clickIngred(ing){
    openloading()
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    let response = await apiResponse.json()
    console.log(response);
    display(response.meals)
    $(".layer").click((e)=>{
        id = e.target.id
        details(id)
    })
    closeLoading()
}
/////////////////////////////////////////DETAILS
async function details(id) {
    openloading()
    row.innerHTML = "";
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response = await apiResponse.json()
    let descMeal = response.meals
    console.log(descMeal);
    displayDesc(descMeal)
    closeLoading()

}



 function displayDesc(meal) {
    document.getElementById("searchCon").innerHTML="";
    let components = "";

      for (let i = 1; i <= 10; i++) {
         if (meal[`strIngredient${i}`]) {
             components += `<li class="alert m-3 p-4 alert-info ">${meal[0].strMeasure[i]} ${meal[0].strIngredient[i]}</li>`
         }  
      }
    let meals = `
    <div class="col-md-4 ">
                         <div class="roundeed-3">
                             <img src="${meal[0].strMealThumb}" alt="" class="w-100">
                         </div>
                          <h1 class="text-white mt-2">${meal[0].strMeal}</h1>
                     </div>
                     <div class="col-md-8">
                       <div class="text-white">
                         <h2>Instructions</h2>
                         <p>${meal[0].strInstructions}</p>
                         <h5>Area : <span>${meal[0].strArea}</span></h5>
                         <h5>Category : <span>${meal[0].strCategory}</span></h5>
                         <h5>Recpies :</h5>
                         <ul class="list-unstyled d-flex g-2">
                         ${components}
                         </ul>
                         
                         <h3>Tags : </h3>
                         <h4>${meal[0].strTags}</h4>
                         <button class=" btn btn-danger"><a href="${meal[0].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
                         <button class=" btn btn-danger"><a href="${meal[0].strYoutube}" target="_blank" class="text-decoration-none text-white"> Youtube</a></button>
    
                       </div>
                     </div>
    
    `
   row.innerHTML = meals
 }

///////////////////////////CONTACT//////////////


$(".contact").click(()=>{
    row.innerHTML = "";
    document.getElementById("searchCon").innerHTML=""
    close()
    contact()
})
function contact() {
    row.innerHTML=`
    <div class="contactMe min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
    <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Name" class="form-control" id="nameInput" onkeyup="allInputs()">
                    <div class="nameAlert d-none">
                        <p class="alert alert-danger  text-danger ">Special characters and numbers not allowed</p>
                    </div>
                  </div>  
    <div class="col-md-6">
                    <input type="email" placeholder="Enter Your Email" class="form-control" id="emailInput" onkeyup="allInputs()">
                    <div class="Ealert d-none">
                        <p class="alert alert-danger  text-danger"> Email not valid *exemple@yyy.zzz</p>
                    </div>
                  </div>  
    <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Phone" class="form-control" id="phoneInput" onkeyup="allInputs()">
                    <div class="phoneAlert d-none">
                        <p class="alert alert-danger  text-danger"> Enter valid Phone Number</p>
                    </div>
                  </div>  
    <div class="col-md-6">
                    <input type="number" placeholder="Enter Your Age" class="form-control" id="ageInput" onkeyup="allInputs()">
                    <div class="Agalert d-none">
                        <p class="alert alert-danger  text-danger">Enter age from 1-100</p>
                    </div>
                  </div>  
    <div class="col-md-6">
                    <input type="password" placeholder="Enter Your Password" class="form-control" id="password" onkeyup="allInputs()">
                    <div class="Passalert d-none">
                        <p class="alert alert-danger  text-danger">Minimum eight characters, at least one letter, one number and one special character:</p>
                    </div>
                  </div>  
    <div class="col-md-6">
                    <input type="password" placeholder="Repassword" class="form-control" id="rePassword" onkeyup="allInputs()">
                    <div class="repalert d-none">
                        <p class="alert alert-danger  text-danger">Enter valid repassword</p>
                     </div>
                  </div>  
                  </div>
                  <button id="submitBtn" class="btn btn-outline-danger px-2 m-5"  disabled>Submit</button>
              </div>
          </div>
    `
    $("#nameInput").focus(()=>{
        nameInputFouccus = true
    })
    $("#emailInput").focus(()=>{
        emailInputFouccus = true
    })
    $("#ageInput").focus(()=>{
        ageInputFouccus = true
    })
    $("#phoneInput").focus(()=>{
     phoneInputFouccus = true
    })
    $("#password").focus(()=>{
        passwordInputFouccus = true
    })
    $("#repassword").focus(()=>{
        repasswordInputFouccus = true
    })

}
function nameValidation() {
    return (/^[a-zA-Z]{0,}$/.test($("#nameInput").val()))
}
function emailValidation() {
    console.log($("#emailInput").val());
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#emailInput").val()))
    
}
function phoneValidation() {
    return (/^(01[0125][0-9]{8})$/.test($("#phoneInput").val()))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|100)$/.test($("#ageInput").val()))
}
function passwordValidation() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($("#password").val()))
}
function repasswordValidation() {
    return (  $("#rePassword").val() == $("#password").val())
}
let nameInputFouccus = false
let emailInputFouccus = false
let phoneInputFouccus = false;
let ageInputFouccus = false
let passwordInputFouccus = false;
let repasswordInputFouccus = false


function allInputs() {
    if (nameInputFouccus) {
        if (nameValidation()) {
            $(".nameAlert").addClass("d-none")
        }else{
            $(".nameAlert").removeClass("d-none")
        }
    }
    if (emailInputFouccus) {
        if (emailValidation()) {
            $(".Ealert").addClass("d-none")
        }else{
            $(".Ealert").removeClass("d-none")
        }
    }
    if (phoneInputFouccus) {
        if (phoneValidation()) {
            $(".phoneAlert").addClass("d-none")
        }else{
            $(".phoneAlert").removeClass("d-none")
        }
    }
    if (ageInputFouccus) {
        if (ageValidation()) {
            $(".Agalert").addClass("d-none")
        }else{
            $(".Agalert").removeClass("d-none")
        }
    }
    if (passwordInputFouccus ) {
        if (passwordValidation() ){
            $(".Passalert").addClass("d-none")
        }else{
            $(".Passalert").removeClass("d-none")
        }
    }
    if (repasswordInputFouccus) {
        if (repasswordValidation()) {
            $(".repalert").addClass("d-none")
        }else{
            $(".repalert").removeClass("d-none")
        }
    }
    if (nameValidation() &&
     emailValidation() &&
     phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
        $("#submitBtn").removeAttr("disabled")
    } else{
        $("#submitBtn").attr('disabled', 'disabled')
    }
}




// let components = "";
//      document.getElementById("searchCon").innerHTML="";
//      for (let i = 1; i <= 10; i++) {
//         if (meal[`strIngredient${i}`]) {
//             components += `<li class="alert m-3 p-4 alert-info ">${meal.strMeasure[i]} ${meal.strIngredient[i]}</li>`
//         }  
//      }
//      let tags = ''
//      for (let i = 0; i < tags.length; i++) {
//          tags += `
//          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
//      }
//     let meals = "";
//     for (let i = 0; i < meal.length; i++) {
//         meals += `
//         <div class="col-md-4 ">
//                     <div class="roundeed-3">
//                         <img src="${meal[i].strMealThumb}" alt="" class="w-100">
//                     </div>
//                      <h1 class="text-white mt-2">${meal[i].strMeal}</h1>
//                 </div>
//                 <div class="col-md-8">
//                   <div class="text-white">
//                     <h2>Instructions</h2>
//                     <p>${meal[i].strInstructions}</p>
//                     <h5>Area : <span>${meal[i].strArea}</span></h5>
//                     <h5>Category : <span>${meal[i].strCategory}</span></h5>
//                     <h5>Recpies :</h5>
//                     <ul class="list-unstyled d-flex g-2">
//                     ${components}
//                     </ul>

//                     <h3>Tags : ${tags}</h3>
//                     <h4>${meal[i].strTags}</h4>
//                     <button class=" btn btn-danger"><a href="${meal[i].strSource}" target="_blank" class="text-decoration-none text-white">Source</a></button>
//                     <button class=" btn btn-danger"><a href="${meal[i].strYoutube}" target="_blank" class="text-decoration-none text-white"> Youtube</a></button>

//                   </div>
//                 </div>
//         `
        
//     }
//  row.innerHTML = meals