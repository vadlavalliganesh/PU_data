let jsondata;

function startfun() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    const data = JSON.parse(this.responseText);
    jsondata = data;
    create_option();
  };
  xhttp.open(
    "GET",
    "data.json"
  );
  xhttp.send();
}
function create_option() {
    const arr = [];
    for (const i in jsondata) {
        if (arr.includes(jsondata[i].DivisionCode)) {
            continue;
        } else {
            arr.push(jsondata[i].DivisionCode);
        }
    }
    let division = document.getElementById("divison");
    for (let i in arr) {
        var opt = arr[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        division.appendChild(el);
    }
}

function selected() {
    const division = document.getElementById("divison").value;
    if (division != "DivisionCode") {
        let html = "";
        let data = jsondata;
      for (let i in data) {
        if (data[i].DivisionCode == division)
        {
        var gender = data[i].Gender.toLowerCase();
        if (gender == "m") {
          html +=
            '<div class="list-main-m" id="' +
            i +
            '" onclick="clicking(this.id);"><div class="icon-list"><img src="images/man.png" class="icon"></div><div class="name-list-div"><span class="list-name-m">' +
            data[i].StudentName +
            '</span><br><span class="list-id">' +
            data[i].EnrollmentNo +
            "</span></div></div><br>";
        } else {
          html +=
            '<div class="list-main-f" id="' +
            i +
            '" onclick="clicking(this.id);"><div class="icon-list"><img src="images/woman.png" class="icon"></div><div class="name-list-div"><span class="list-name-f">' +
            data[i].StudentName +
            '</span><br><span class="list-id">' +
            data[i].EnrollmentNo +
            "</span></div></div><br>";
        }
        }
      }
      document.getElementById("hellosj").innerHTML = html;
    }
    else{
        document.getElementById("hellosj").innerHTML =
      "<center>Select or Search The person</center>";
    }
}

function clicking(index)
{
    const data = jsondata[index];
    var gender = data.Gender.toLowerCase();
    document.getElementById("preview-name").innerText = data.StudentName;
    document.getElementById("preview-admin-no").innerText = data.EnrollmentNo;
    document.getElementById("preview-class").innerText = data.StudentProgram +" | "+data.DivisionCode + " | "+data.LabBatchNo;
    document.getElementById("preview-number").innerText= data.PhoneStudent1 + " | "+data.PhoneStudent2;
    document.getElementById("preview-mail").innerText = data.Email;
    document.getElementById("whatsapp").href = "https://wa.me/91"+data.PhoneStudent1;
    document.getElementById("email").href = "mailto:"+data.Email;
    document.getElementById("overlay").style.display = "block";
    if (gender == "m")
    {
      document.getElementById("preview").style.backgroundColor = "lightblue";
      document.getElementById("preview-img").src= "images/man.png";
      const elements = document.querySelectorAll('.text-preview');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = "pink";
        elements[i].style.backgroundColor = "blue";
      }
    }
    else{
      document.getElementById("preview").style.backgroundColor = "pink";
      document.getElementById("preview-img").src= "images/woman.png";
      const elements = document.querySelectorAll('.text-preview');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = "blue";
        elements[i].style.backgroundColor = "pink";
        } 
      }
}

function dosearch()
{
  const query = document.getElementById("dosearch").value.toLowerCase();
  let html = "";
  for (let i in jsondata)
  {
    if(jsondata[i].StudentName.toLowerCase().includes(query) || jsondata[i].EnrollmentNo.toLowerCase().includes(query))
    {
      const gender = jsondata[i].Gender.toLowerCase();
      if (gender == "m") {
        html +=
          '<div class="list-main-m" id="' +
          i +
          '" onclick="clicking(this.id);"><div class="icon-list"><img src="images/man.png" class="icon"></div><div class="name-list-div"><span class="list-name-m">' +
          jsondata[i].StudentName +
          '</span><br><span class="list-id">' +
          jsondata[i].EnrollmentNo +
          "</span></div></div><br>";
      } else {
        html +=
          '<div class="list-main-f" id="' +
          i +
          '" onclick="clicking(this.id);"><div class="icon-list"><img src="images/woman.png" class="icon"></div><div class="name-list-div"><span class="list-name-f">' +
          jsondata[i].StudentName +
          '</span><br><span class="list-id">' +
          jsondata[i].EnrollmentNo +
          "</span></div></div><br>";
      }
    }
  }
  document.getElementById("hellosj").innerHTML = html;
}
function displaysearch(){
  document.getElementById("dropdown").innerHTML= '<input type="search" id="dosearch" placeholder="Enter The Student Name || Roll Number" oninput="dosearch()"> <img id="search-close" src = "images/close.png" onclick="displaylist()">';
}

function displaylist(){
  var html = '<select name="divison" id="divison" onchange="selected()" onload=""> </select> <img src="images/search.png" id="search-icon" onclick="displaysearch()">';
  document.getElementById("dropdown").innerHTML=html;
  create_option();
}
function previewoff() {
  document.getElementById("overlay").style.display = "none";
}
