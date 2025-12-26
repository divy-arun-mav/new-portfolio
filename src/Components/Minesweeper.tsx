import { useState, useEffect } from 'react';

interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
}

const Minesweeper = () => {
    const ROWS = 9;
    const COLS = 9;
    const MINES = 10;

    const createInitialGrid = (): Cell[][] => {
        const newGrid: Cell[][] = [];

        for (let i = 0; i < ROWS; i++) {
            newGrid[i] = [];
            for (let j = 0; j < COLS; j++) {
                newGrid[i][j] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0,
                };
            }
        }

        let minesPlaced = 0;
        while (minesPlaced < MINES) {
            const row = Math.floor(Math.random() * ROWS);
            const col = Math.floor(Math.random() * COLS);
            if (!newGrid[row][col].isMine) {
                newGrid[row][col].isMine = true;
                minesPlaced++;
            }
        }

        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (!newGrid[i][j].isMine) {
                    let count = 0;
                    for (let di = -1; di <= 1; di++) {
                        for (let dj = -1; dj <= 1; dj++) {
                            const ni = i + di;
                            const nj = j + dj;
                            if (ni >= 0 && ni < ROWS && nj >= 0 && nj < COLS && newGrid[ni][nj].isMine) {
                                count++;
                            }
                        }
                    }
                    newGrid[i][j].neighborMines = count;
                }
            }
        }

        return newGrid;
    };

    const [grid, setGrid] = useState<Cell[][]>(createInitialGrid);
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [flagCount, setFlagCount] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        let interval: number;
        if (isTimerRunning && gameStatus === 'playing') {
            interval = setInterval(() => {
                setTimer(prev => Math.min(prev + 1, 999));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, gameStatus]);

    const initializeGame = () => {
        setGrid(createInitialGrid());
        setGameStatus('playing');
        setFlagCount(0);
        setTimer(0);
        setIsTimerRunning(false);
    };

    const revealCell = (row: number, col: number) => {
        if (gameStatus !== 'playing' || grid[row][col].isRevealed || grid[row][col].isFlagged) {
            return;
        }

        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }

        const newGrid = [...grid.map(r => [...r])];

        if (newGrid[row][col].isMine) {
            for (let i = 0; i < ROWS; i++) {
                for (let j = 0; j < COLS; j++) {
                    if (newGrid[i][j].isMine) {
                        newGrid[i][j].isRevealed = true;
                    }
                }
            }
            setGrid(newGrid);
            setGameStatus('lost');
            setIsTimerRunning(false);
            return;
        }

        const reveal = (r: number, c: number) => {
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS || newGrid[r][c].isRevealed || newGrid[r][c].isFlagged) {
                return;
            }

            newGrid[r][c].isRevealed = true;

            if (newGrid[r][c].neighborMines === 0) {
                for (let di = -1; di <= 1; di++) {
                    for (let dj = -1; dj <= 1; dj++) {
                        reveal(r + di, c + dj);
                    }
                }
            }
        };

        reveal(row, col);
        setGrid(newGrid);

        let revealedCount = 0;
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLS; j++) {
                if (newGrid[i][j].isRevealed && !newGrid[i][j].isMine) {
                    revealedCount++;
                }
            }
        }

        if (revealedCount === ROWS * COLS - MINES) {
            setGameStatus('won');
            setIsTimerRunning(false);
        }
    };

    const toggleFlag = (row: number, col: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (gameStatus !== 'playing' || grid[row][col].isRevealed) {
            return;
        }

        if (!isTimerRunning) {
            setIsTimerRunning(true);
        }

        const newGrid = [...grid.map(r => [...r])];
        newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
        setGrid(newGrid);
        setFlagCount(prev => newGrid[row][col].isFlagged ? prev + 1 : prev - 1);
    };

    const getCellContent = (cell: Cell) => {
        if (!cell.isRevealed) {
            return cell.isFlagged ? '🚩' : '';
        }
        if (cell.isMine) {
            return '💣';
        }
        if (cell.neighborMines === 0) {
            return '';
        }
        return cell.neighborMines;
    };

    const getCellColor = (num: number) => {
        const colors = ['', '#0000FF', '#008000', '#FF0000', '#000080', '#800000', '#008080', '#000000', '#808080'];
        return colors[num] || '#000';
    };

    return (
        <div className="bg-[#C0C0C0] h-full flex flex-col p-2">
            <div className="bg-[#ECE9D8] border-b-2 border-[#ACA899] px-2 py-1 flex gap-4 mb-2 relative">
                <div className="relative">
                    <span
                        className="text-black cursor-pointer hover:bg-[#316AC5] hover:text-white px-2"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        Game
                    </span>
                    {showMenu && (
                        <div className="absolute top-full left-0 bg-[#ECE9D8] border-2 border-[#FFFFFF] border-r-[#808080] border-b-[#808080] shadow-lg z-10 min-w-[150px]">
                            <div
                                className="px-4 py-2 hover:bg-[#316AC5] hover:text-white cursor-pointer text-sm"
                                onClick={() => {
                                    initializeGame();
                                    setShowMenu(false);
                                }}
                            >
                                New Game &nbsp; &nbsp; F2
                            </div>
                            <div className="border-t border-[#ACA899] my-1"></div>
                            <div className="px-4 py-2 hover:bg-[#316AC5] hover:text-white cursor-pointer text-sm text-gray-400">
                                Beginner
                            </div>
                            <div className="px-4 py-2 hover:bg-[#316AC5] hover:text-white cursor-pointer text-sm text-gray-400">
                                Intermediate
                            </div>
                            <div className="px-4 py-2 hover:bg-[#316AC5] hover:text-white cursor-pointer text-sm text-gray-400">
                                Expert
                            </div>
                        </div>
                    )}
                </div>
                <span className="text-black cursor-pointer hover:bg-[#316AC5] hover:text-white px-2">Help</span>
            </div>

            <div className="bg-[#C0C0C0] border-4 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#808080] border-r-[#808080] p-2 flex justify-between items-center mb-2">
                <div className="bg-black text-[#FF0000] font-bold text-xl px-3 py-1 border-2 border-[#808080] font-mono">
                    {String(MINES - flagCount).padStart(3, '0')}
                </div>

                <button
                    onClick={initializeGame}
                    className="w-8 h-8 bg-[#C0C0C0] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#808080] border-r-[#808080] text-2xl active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]"
                >
                    {gameStatus === 'won' ? '😎' : gameStatus === 'lost' ? '😵' : '🙂'}
                </button>

                <div className="bg-black text-[#FF0000] font-bold text-xl px-3 py-1 border-2 border-[#808080] font-mono">
                    {String(timer).padStart(3, '0')}
                </div>
            </div>

            <div className="bg-[#C0C0C0] border-4 border-t-[#808080] border-l-[#808080] border-b-[#FFFFFF] border-r-[#FFFFFF] p-1">
                <div className="inline-block">
                    {grid.map((row, i) => (
                        <div key={i} className="flex">
                            {row.map((cell, j) => (
                                <button
                                    key={j}
                                    onClick={() => revealCell(i, j)}
                                    onContextMenu={(e) => toggleFlag(i, j, e)}
                                    disabled={gameStatus !== 'playing'}
                                    className={`w-6 h-6 text-xs font-bold flex items-center justify-center ${cell.isRevealed
                                        ? 'bg-[#C0C0C0] border border-[#808080]'
                                        : 'bg-[#C0C0C0] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#808080] border-r-[#808080] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]'
                                        }`}
                                    style={{
                                        color: cell.isRevealed && !cell.isMine ? getCellColor(cell.neighborMines) : '#000',
                                    }}
                                >
                                    {getCellContent(cell)}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {gameStatus !== 'playing' && (
                <div className="mt-2 text-center">
                    <div className="text-sm font-bold mb-2">
                        {gameStatus === 'won' ? '🎉 You Won!' : '💥 Game Over!'}
                    </div>
                    <button
                        onClick={initializeGame}
                        className="bg-[#ECE9D8] border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-b-[#808080] border-r-[#808080] px-4 py-1 text-sm hover:bg-[#F0F0F0] active:border-t-[#808080] active:border-l-[#808080] active:border-b-[#FFFFFF] active:border-r-[#FFFFFF]"
                    >
                        New Game
                    </button>
                </div>
            )}
        </div>
    );
};

export default Minesweeper;
