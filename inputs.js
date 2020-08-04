export default class InputHandler{
    constructor (snakehead) {
        document.addEventListener("keydown", (event)=>{
            switch (event.keyCode) {
                case 37:
                    snakehead.movement = 'left'
                    break;
                case 39:
                    snakehead.movement = 'right'
                    break
                case 38:
                    snakehead.movement = 'up'
                    break;
                case 40:
                    snakehead.movement = 'down'
                    break;
            }
        })
    }
}