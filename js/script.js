var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay:{
        depaly:2000,
    },
    loop:true,
    
  });

  var swiper1 = new Swiper(".bnr-swiperArea", {
    slidesPerView: 6,
    spaceBetween: 0,
   
   navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
    autoplay:{
      depaly:1000,
    },
    loop:true, 
});



var swiper = new Swiper(".health-swiper", {
  slidesPerView: 2,
  spaceBetween: 30,


  navigation: {
    nextEl: ".health-swiper-button-next",
    prevEl: ".health-swiper-button-prev",
  },
  autoplay:{
      depaly:2000,
  },
  loop:true,
  
});
var swiper1 = new Swiper(".health-swiper1", {
  slidesPerView: 2,
  spaceBetween: 30,


  navigation: {
    nextEl: ".health-swiper-button-next1",
    prevEl: ".health-swiper-button-prev1",
  },
  autoplay:{
      depaly:2000,
  },
  loop:true,
  
}); 