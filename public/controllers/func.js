// adding new user to db
function add() {
    console.log("yes triggered");
    var name = document.getElementById("name").value;
    var img_url = document.getElementById("img_url").value;
    document.getElementById("name").value = "";
    document.getElementById("img_url").value = "";
    var obj = { "user_name": name, "user_img_url": img_url, "user_status": "pending" };
    fetch('/addToDb', {
        "headers": {
            "Accept": "application/json",
            "Content-type": "application/json",
        },
        "method": "post",
        "body": JSON.stringify(obj)
    }).then((res) => res.json())
    .then((data) => { 
        swal(
            "Request sent",
            "Your request is pending.",
            "success"
        );
        setTimeout(() => {
            swal.close();
        }, 3500);
     })
     .catch((err) => console.log(err));
}

// get all user requests
function allRequests(){
    var section=document.getElementById('content');
    var login=document.querySelector('.login'); 
    fetch('/getAllUser',{
      "headers":{
          "Accept":"application/json",
          "Content-type":"application/json",
      },
      "method":"get",
    }).then((res)=>res.json())
    .then((data)=>{ 
      var flag=0;
      if(data.length==0){
       noUser("No Pending User requests","");
        }
    
    data.forEach((i)=>{
    if(i.user_status=="pending"){   // show only pending user 
     //tile creation
    var div=document.createElement('div');
    div.className+="ui center aligned";
    div.setAttribute('id','tile');
    // set image 
    var img=document.createElement('img');
    img.className +="tile-img";
    img.setAttribute('src',i.user_img_url);
    // append image to section container
    div.appendChild(img);
    content.appendChild(div);
    // set name and buttons (lets say info)
    var info=document.createElement('div');
    info.className+="tile-info";
    info.innerHTML=`<h1>${i.user_name}</h1>`;
     // accept button
      var acceptBtn=document.createElement('button');
      acceptBtn.className+="ui inverted green button";
      acceptBtn.setAttribute('id','accceptBtn');
      acceptBtn.innerText="Accept";
      acceptBtn.setAttribute('onclick',`accept('${i._id}')`);
      
    // decline button
    var declineBtn=document.createElement('button');
    declineBtn.className+="ui inverted red button";
    declineBtn.innerText="decline";
    //var id=i._id;
    declineBtn.setAttribute('onclick',`decline('${i._id}')`);
    // append butons to tile-info 
    info.appendChild(acceptBtn);
    info.appendChild(declineBtn);
    div.appendChild(info);
  } // end of if statement
  else{
    flag=flag+1;
  }  
  console.log(flag);
  if(flag==data.length){
    noUser("No Pending User requests","Check AddedUsers to view approved users list.");
    

  }
  }) // end of loop
 
  }).catch((err)=>console.log(err));
}

// functions trigger for decline
function decline(id) {
    console.log("triggered dec");
    var obj = { "user": id };

    fetch('/declineUser', {
        'headers': {
            "Accept": "application/json",
            "Content-type": "application/json",
        },
        "method": "post",
        "body": JSON.stringify(obj)

    })
        .then((data) => data.json())
        .then((res) => {
            if (res.result == "ok") {
                swal(
                    "Declined",
                    "User declined successfuly ",
                    "success"
                ).then(() => window.location.reload());
                setTimeout(() => {
                    swal.close();
                    window.location.reload();
                    
                }, 2000);
                
            }
        });
}

// functions trigger for decline
function accept(id) {
    console.log("triggered dec", id);
    var obj = { "_id": id, "user_status": "accepted" };
    // update status
    fetch('/userStatus', {
        "headers": {
            "Accept": "application/json",
            "Content-type": "application/json",
        },
        "method": "post",
        "body": JSON.stringify(obj)
    }).then(() => {
        // pop msg
        swal(
            "Accepted",
            "User acceped ! ",
            "success"
        ).then(() => window.location.reload());
        setTimeout(() => {
            swal.close();
            window.location.reload();
            
        }, 2000);
    }).catch((err) => console.log(err));
}

//no user
function noUser(msg,detial){
  
    //tile creation
    var div=document.createElement('div');
    div.className+="ui center aligned";
    div.setAttribute('id','tile');
    // set image 
    var img=document.createElement('img');
    img.className +="tile-img";
    img.setAttribute('src','https://image.freepik.com/free-vector/cute-astronaut-working-laptop-cartoon-vector-icon-illustration_138676-3472.jpg');
    // append image to section container
    div.appendChild(img);
    content.appendChild(div);
    // set name and buttons (lets say info)
    var info=document.createElement('div');
    info.className+="tile-info";
    info.innerHTML=`<h1>${msg}</h1><p>${detial}</p>`;
    div.appendChild(info);
}

