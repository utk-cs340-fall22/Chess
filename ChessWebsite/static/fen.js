function fen(){
 
    //Get the variables from board.js
    turn = localStorage.turn;
    pas = localStorage.pas;
    cas = localStorage.cas;
    half = localStorage.half;
    full = localStorage.full;
    flip = localStorage.flip;

    let fen = "";
    let tab = document.getElementById("chessboard");
    let count = tab.childElementCount;
    
    let space = 0;
    //Iterate over all child nodes
    if(flip === "no"){
        for(let i = 0; i <= 7; i++){
            for(let j = 0; j < 8; j++){

            //Add a space if there is no piece
                if(tab.children[(i * 8) + j].children[0] === undefined){
                    space++;
            }   else{
                    //Add the spaces now that there is a piece
                    if(space !== 0){
                        fen += space;
                        space = 0;
                    }

                    fen += tab.children[(i * 8) + j].children[0].classList.item(1);
                }

                //End of the row and not the last row
                if(j === 7 && i !== 7){
                
                    if(space !== 0){
                        fen += space;
                    }

                    fen += '/';
                    space = 0;
                }
            }
        }
    }else{
        for(let i = 7; i >= 0; i--){
            for(let j = 0; j < 8; j++){

            //Add a space if there is no piece
                if(tab.children[(i * 8) + j].children[0] === undefined){
                    space++;
            }   else{
                    //Add the spaces now that there is a piece
                    if(space !== 0){
                        fen += space;
                        space = 0;
                    }

                    fen += tab.children[(i * 8) + j].children[0].classList.item(1);
                }

                //End of the row and not the last row
                if(j === 7 && i !== 0){
                
                    if(space !== 0){
                        fen += space;
                    }

                    fen += '/';
                    space = 0;
                }
            }
        }
    }

    fen += ' ';

    //Whose turn is it, b = black | white = w
   
    let t = (turn === "white-piece") ? "w" : "b";
    
    fen += t + ' ';

    //Next you say what castling is available
    //q = castle queenside possible
    //k = castle kingside
    //Can be either KQkq or Qk- or -- or etc
    if(cas !== ''){
        fen += cas + ' ';
    }else{
        fen += '-' + ' ';
    }
    
    //Next you do en passant targets
    fen += pas + ' ';

    //Next is how many moves both players have made since the last pawn advance or piece capture
    //Game ends in a draw if this is 100

    fen += half + ' ';

    //Last field is the number of completed turns in the game.
    //This number is incremented by one every time Black moves.

    fen += full + ' ';

    return fen;
}

function fenin(fen){
 
    flip = localStorage.flip;
    let full = fen[fen.length-1];
    let half = fen[fen.length-3];
 
    var check = fen.length - 5;
 
    let pas = "-";
    if(fen[check] !== "-"){
        pas = fen[check-1] + fen[check];
        check--;
    }
 
    check -= 2;
 
    let castle = "-";
    if(fen[check] !== "-"){
        while(fen[check] !== " "){
            castle += fen[check];
            check--;
        }
        check++;
    }
    check -= 2;
 
    let color = fen[check];
    check -= 2;

    var index;
    var slash = 0;
    localStorage.cas = cas;
    localStorage.pas = pas;
    localStorage.half = half;
    localStorage.full = full;
    localStorage.turn = (color === "w") ? "white-piece" : "black-piece";
    let board = document.getElementById("chessboard");

    if(flip === "no"){
        index = 63;
        //var test = "r4R"
        while(check !== -1){
            if(board.children[index].children[0] !== undefined){
                board.children[index].removeChild(board.children[index].children[0]);
            }

            if(Number(fen[check]) > 0){
                //count += fen[count]
                index -= Number(fen[check]);
                index += 1;
                console.log("TEST " + check + " " + index + " del " + Number(fen[check]));
            }else if(fen[check] !== "/"){
                piece = document.createElement("DIV");
                piece.id = index + 9 + 9;
                if(fen[check] > "a"){
                    piece.classList.add("black-piece");
                    console.log("YEP");
                    if(fen[check] === "p"){
                        piece.classList.add("p");
                        piece.classList.add("B_p");
                        if(slash === 6){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "r"){
                        piece.classList.add("r");
                        piece.classList.add("B_r");
                        if(cas.includes("k")){
                            cas.replace('k', '');
                            cas += "b"
                            piece.classList.add("First");
                            piece.classList.add(2);
                        }else if(cas.includes("q")){
                            cas.replace('q', '');
                            //cas += "b"
                            piece.classList.add("First");
                            piece.classList.add(3); 
                        }
                    }else if(fen[check] === "k"){
                        piece.classList.add("k");
                        piece.classList.add("B_k");
                        if(cas.includes("q") || cas.includes("b")){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "q"){
                        piece.classList.add("q");
                        piece.classList.add("B_q");
                    }else if(fen[check] === "b"){
                        piece.classList.add("b");
                        piece.classList.add("B_b");
                    }else{
                        piece.classList.add("n");
                        piece.classList.add("B_n");
                    }
                }else{
                    piece.classList.add("white-piece");
                    console.log("?Noope");
                    if(fen[check] === "P"){
                        piece.classList.add("P");
                        piece.classList.add("W_p");
                        if(slash === 1){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "R"){
                        piece.classList.add("R");
                        piece.classList.add("W_r");
                        if(cas.includes("K")){
                            cas.replace('K', '');
                            cas += "W"
                            piece.classList.add("First");
                            piece.classList.add(0);
                        }else if(cas.includes("Q")){
                            cas.replace('Q', '');
                            //cas += "W"
                            piece.classList.add("First");
                            piece.classList.add(1); 
                        }
                    }else if(fen[check] === "K"){
                        piece.classList.add("K");
                        if(cas.includes("Q") || cas.includes("W")){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "Q"){
                        piece.classList.add("Q");
                    }else if(fen[check] === "B"){
                        piece.classList.add("B");
                    }else{
                        piece.classList.add("N");
                    }

                }

                board.children[index].appendChild(piece);

                console.log("TEST " + check + " Mid " + index);

            }else{
                slash++;
                index++;

                //console.log("TEST " + check + "  slash " + index);
            }

            index--;
            check--;
        }
    }else{
        index = 0;
        //var test = "r4R"
        while(check !== -1){
            if(board.children[index].children[0] !== undefined){
                board.children[index].removeChild(board.children[index].children[0]);
            }

            if(Number(fen[check]) > 0){
                //count += fen[count]
                index += Number(fen[check]);
                index -= 1;
                //console.log("TEST " + check + " " + index + " del " + Number(fen[check]));
            }else if(fen[check] !== "/"){
                piece = document.createElement("DIV");
                piece.id = index + 9 + 9;
                if(fen[check] > "a"){
                    piece.classList.add("black-piece");
                    //console.log("YEP");
                    if(fen[check] === "p"){
                        piece.classList.add("p");
                        piece.classList.add("B_p");
                        if(slash === 6){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "r"){
                        piece.classList.add("r");
                        piece.classList.add("B_r");
                        if(cas.includes("q")){
                            cas.replace('q', '');
                            cas += "b"
                            piece.classList.add("First");
                            piece.classList.add(2);
                        }else if(cas.includes("k")){
                            cas.replace('k', '');
                            //cas += "b"
                            piece.classList.add("First");
                            piece.classList.add(3); 
                        }
                    }else if(fen[check] === "k"){
                        piece.classList.add("k");
                        piece.classList.add("B_k");
                        if(cas.includes("k") || cas.includes("b")){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "q"){
                        piece.classList.add("q");
                        piece.classList.add("B_q");
                    }else if(fen[check] === "b"){
                        piece.classList.add("b");
                        piece.classList.add("B_b");
                    }else{
                        piece.classList.add("n");
                        piece.classList.add("B_n");
                    }
                }else{
                    piece.classList.add("white-piece");
                    //console.log("?Noope");
                    if(fen[check] === "P"){
                        piece.classList.add("P");
                        piece.classList.add("W_p");
                        if(slash === 1){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "R"){
                        piece.classList.add("R");
                        piece.classList.add("W_r");
                        if(cas.includes("Q")){
                            cas.replace('Q', '');
                            cas += "W"
                            piece.classList.add("First");
                            piece.classList.add(0);
                        }else if(cas.includes("K")){
                            cas.replace('K', '');
                            //cas += "W"
                            piece.classList.add("First");
                            piece.classList.add(1); 
                        }
                    }else if(fen[check] === "K"){
                        piece.classList.add("K");
                        if(cas.includes("K") || cas.includes("W")){
                            piece.classList.add("First");
                        }
                    }else if(fen[check] === "Q"){
                        piece.classList.add("Q");
                    }else if(fen[check] === "B"){
                        piece.classList.add("B");
                    }else{
                        piece.classList.add("N");
                    }

                }

                board.children[index].appendChild(piece);

                //console.log("TEST " + check + " Mid " + index);

            }else{
                slash++;
                index--;

                //console.log("TEST " + check + "  slash " + index);
            }

            index++;
            check--;
        }

    }



    //console.log(color + " " + castle + " " + pas + " " + full + " " + half + " " + fen[check]);

}

