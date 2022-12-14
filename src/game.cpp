#include <iostream>
#include <string>
#include "game.h"
#include "board.h"
#include "move.h"
#include "search.h"
//#include <emscripten/bind.h>
//using namespace emscripten;
//When using webassembly comment namespace out
using namespace std;


std::string Game::playTurn(std::string FEN){
    int eval, materialCount, maxDepth;
    Board position;
    positions.push_back(position);

    //set up position
    position.positionsEvaluated = 0;
    position.initialize_tables();
    position.genBoardFromFEN(FEN);
    position.whiteCastled = 0;
    position.blackCastled = 0;
    position.whiteMovedQueen = 0;
    position.blackMovedQueen = 0;
    position.whiteMovedKing = 0;
    position.blackMovedKing = 0;
    position.isOpening = 0;

    materialCount = position.getMaterialCount(0) + position.getMaterialCount(1);
    if(materialCount > 2000) {maxDepth = 4; position.isEndgame = 0;}
    else if(materialCount > 750) {maxDepth = 6; position.isEndgame = 1;}
    else {maxDepth = 8; position.isEndgame = 1;}

    if(position.getFullMoveNumber() < 5){position.isOpening = 1; maxDepth = 6;}

    //then do the search for the best move
    eval = search(&position, maxDepth, 0, -10010, 10010);

    printf("Evaluation: %f\n", double(eval) / 100);
    printf("Positions Evaluated: %d\n", position.positionsEvaluated);
    printf("Max Depth: %d\n", maxDepth);
    printf("Best Move: ");
    (position.bestMove).printMove();

    //make the best move
    position.makeMove(position.bestMove);
    position.color = !position.color;

    printf("Returning FEN String: %s\n", (position.genFENFromBoard()).c_str());
    

    //return the updated FEN string
    return position.genFENFromBoard();
}

//EMSCRIPTEN_BINDINGS(my_class_example) {
// class_<Game>("chessGame")
//    .constructor<>()
//    .function("playTurn", &Game::playTurn)
//    ;
//}
