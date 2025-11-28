const clickMe = () => {
alert("Thanks for clicking me. Hope you have a nice day!")
}
$(document).ready(function(){
$('.materialboxed').materialbox();
$('#clickMeButton').click(()=>{
clickMe();
})
});

const submitForm = () => {
  let formData = {};
  formData.first_name = $('#first_name').val();
  formData.last_name = $('#last_name').val();
  formData.password = $('#password').val();
  formData.email = $('#email').val();

  console.log("Form Data Submitted: ", formData);
}

const cardList = [
  { 
    title: "Coach Alex", 
    image: "images/alex.png", 
    link: "About Coach Alex", 
    description: "Professional boxing expert with 10 years of experience!" 
  },
  { 
    title: "Coach Mia", 
    image: "images/mia.png", 
    link: "About Coach Mia", 
    description: "Specialist counter striking." 
  },
  { 
    title: "Coach David", 
    image: "images/david.png", 
    link: "About Coach David", 
    description: "Former champ and footwork specilist." 
  }
];

const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = 
      '<div class="col s4 center-align">' +
        '<div class="card medium">' +
          '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + item.image + '">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title +
              '<i class="material-icons right">more_vert</i></span>' +
            '<p><a class="activator">' + item.link + '</a></p>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title +
              '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    $("#card-section").append(itemToAppend);
  });
};


$(document).ready(function(){
  console.log("JS Loaded Successfully");
  $('.materialboxed').materialbox();
  $('.modal').modal();  
  $('#clickMeButton').click(() => submitForm());
  addCards(cardList);
});

