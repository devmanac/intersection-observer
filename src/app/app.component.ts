import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    const cards = document.querySelectorAll(".card");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      })
      console.log(entries);
    })

    cards.forEach(card => {
      observer.observe(card);
    })
    

    // Observes last card in container and adds new card
    const lastCardObserver = new IntersectionObserver(entries => {
      const lastCard = entries[0];
      if (!lastCard.isIntersecting ) {
        return;
      }
      loadNewCards();
      lastCardObserver.unobserve(lastCard.target);
      const newLastCard =  document.querySelector(".card:last-child");
      if (!!newLastCard) {
        lastCardObserver.observe(newLastCard);
      }
    
      
    })

    const cardContainer = document.querySelector(".card-container");
    function loadNewCards(): void {
      for (let i=0; i<10; i++) {
        const card = document.createElement("div");
        card.textContent = "New Card";
        card.classList.add("card");
        observer.observe(card);
        cardContainer?.append(card);
      }
    }

    const lastCardForObserver = document.querySelector(".card:last-child");
    if (!!lastCardForObserver) {
      lastCardObserver.observe(lastCardForObserver);
    }

    
  }
  title = 'intersection-observer';


  
}
