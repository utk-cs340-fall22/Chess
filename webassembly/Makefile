#Must have emsdk installed and activated to work
#Must activate emsdk every time you start your shell unless you activated it permanently

EXECUTABLES = .././Chesswebsite/static/chess.js .././Chesswebsite/static/chess.wasm

ALL: $(EXECUTABLES)


#include all of the used .cpp files
#Will need to modify the .cpp files to make sure we can use some of the functions in the .js
.././Chesswebsite/static/chess.js: .././src/board.cpp .././src/game.cpp .././src/main.cpp .././src/move.cpp .././src/search.cpp
	emcc -lembind -o .././Chesswebsite/static/chess.js .././src/board.cpp .././src/game.cpp .././src/main.cpp .././src/move.cpp .././src/search.cpp
#example below of files that I know complies
#	emcc -lembind -o .././Chesswebsite/src/chess.js .././src/quick_example.cpp .././src/l.cpp
