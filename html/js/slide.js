const cards = [
    {p1:'Music', title: 'DJ Night', author: 'DJ Chetas', image: 'photos/event1.jpg'},
    {p1:'Stand-up Comedy', title: 'The Laugh Store', author: 'Pratyush Chaubey', image: 'photos/event2.jpg'},
    {p1:'Live Performance', title: 'Wednesday Live', author: 'Swaran Project', image: 'photos/event3.jpg'},
    {p1:'Musical Theatre', title: 'Emma | The Musical', author: 'Jane Austen', image: 'photos/event4.jpg'}
  ]
  
  new Vue({
    el: '#app',
    data: {
      cards: cards,
      selectedCard: -1
    },
    methods: {
      hoverCard(selectedIndex) {
        this.selectedCard = selectedIndex
        this.animateCards()
      },
      animateCards () {
        this.cards.forEach((card, index) => {
          const direction = this.calculateCardDirection(index, this.selectedCard)
          TweenMax.to(
            this.$refs[`card_${index}`], 
            0.3, 
            {x: direction * 50}
          )
        })
      },
      calculateCardDirection (cardIndex, selectedIndex) {
        if(selectedIndex === -1) {
          return 0
        }
        
        const diff = cardIndex - selectedIndex
        return diff === 0 ? 0 : diff/Math.abs(diff)
      },
      isSelected (cardIndex) {
        return this.selectedCard === cardIndex
      }
    }
  })