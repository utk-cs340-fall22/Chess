#include <cstring>
#include <unistd.h>
#include "board.h"
#include "move.h"
#include "search.h"

int search(Board* position, int depth, int alpha, int beta){
    if(depth == 4){
        position->positionsEvaluated++;
        return position->evaluatePosition();
    }

    if(position->color == 0){
        int wcurrent;
        int max = -10000;
        int capturedPieceType;
        int numMovesWhite;
        Move whiteMoves[128];

        position->genMoves();
        memcpy(whiteMoves, position->moves, sizeof(Move) * 128);
        numMovesWhite = position->moveIndex;
        for(int i = 0; i < numMovesWhite; i++){
            //printf("Depth %d Trying White Move %d: ", depth, i);
            //whiteMoves[i].printMove();
            capturedPieceType = position->makeMove(whiteMoves[i]);
            if(!position->inCheck()){
                position->color = 1;
                wcurrent = search(position, depth + 1, alpha, beta);
                if(wcurrent > max){
                    max = wcurrent;
                    if(depth == 0) position->bestMove = whiteMoves[i];
                }
                if(max > alpha) alpha = max;
                if(beta <= alpha){
                    position->color = 0;
                    position->undoMove(whiteMoves[i], capturedPieceType);
                    break;
                }
                position->color = 0;
            }
            //else printf("White in check   %s\n", (position->genFENFromBoard()).c_str());
            position->undoMove(whiteMoves[i], capturedPieceType);
        }
        //if stalemate
        if(max == -10000 && !position->inCheck()) return 0;
        //if it's checkmate, then -10000 will be returned, otherwise the eval for white's best move is returned
        //printf("Depth %d: Returning %d\n", depth, max);
        return max;
    }
    else{
        int bcurrent;
        int min = 10000;
        int capturedPieceType;
        int numMovesBlack;
        Move blackMoves[128];

        position->genMoves();
        memcpy(blackMoves, position->moves, sizeof(Move) * 128);
        numMovesBlack = position->moveIndex;
        for(int i = 0; i < numMovesBlack; i++){
            //printf("Depth %d Trying Black Move %d: ", depth, i);
            //blackMoves[i].printMove();
            capturedPieceType = position->makeMove(blackMoves[i]);
            if(!position->inCheck()){
                position->color = 0;
                bcurrent = search(position, depth + 1, alpha, beta);
                if(bcurrent < min){
                    min = bcurrent;
                    if(depth == 0) position->bestMove = blackMoves[i];
                }
                if(min < beta) beta = min;
                if(beta <= alpha){
                    position->color = 1;
                    position->undoMove(blackMoves[i], capturedPieceType);
                    break;
                }
                position->color = 1;
            }
            //else printf("Black in check   %s\n", (position->genFENFromBoard()).c_str());
            position->undoMove(blackMoves[i], capturedPieceType);
        }
        //if stalemate
        if(min == 10000 && !position->inCheck()) return 0;
        //if it's checkmate, then 10000 will be returned, otherwise the eval for black's best move is returned
        //printf("Depth %d: Returning %d\n", depth, min);
        return min;
    }
}
