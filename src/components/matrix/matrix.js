import { React, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CardItem } from '../../classes/cardItem';
import {default_data} from '../../assets/data';

import './matrix.scss';


export const Matrix = ({setIsBingo}) => {
    const [oldBingos, setOldBingos] = useState([]);
    const [bingoMatrix_selected_states, setBingoMatrix_selected_states] = useState([]);

    useEffect(()=>{
        setBingoMatrix_selected_states(fillMatrice());
    },[]);

    useEffect(()=>{
        bingoMatrix_selected_states.length>0 && checkBingo();
    }, [bingoMatrix_selected_states])

    // check single diagonal, row or column selected
    const checkLineSelected = (x, y, dx, dy) => {
        let hasLineSelected = true;
        while(hasLineSelected && x>=0 && x<5 && y>=0 && y < 5) {
            hasLineSelected = hasLineSelected && bingoMatrix_selected_states[x][y].isSelected;
            x += dx;
            y += dy;
        }
        return hasLineSelected;
    }

    // verify is the bingo found is an old bingo or not
    const lineOfBingo = (x, y, dx, dy) => {
        const cellsOfBingo = [];
        let duplicatedArray = false;
        while(x>=0 && x<5 && y>=0 && y < 5) {
            cellsOfBingo.push(''+ x+ y);
            x += dx;
            y += dy;
        }
        oldBingos.forEach(oldBingo => {
            if(compareTwoArrays(oldBingo, cellsOfBingo)) return duplicatedArray = true;
        });
        if(!duplicatedArray) {
            setIsBingo(true);
            setOldBingos(prevState => {
                prevState = [...prevState, cellsOfBingo]
                return prevState
            })
        }
    }

    // verify if there is diagonals, rows or columns selected
    const checkBingo = () => {
        const diagonal1IsBingo = checkLineSelected(0, 0, 1, 1);
        const diagonal2IsBingo = checkLineSelected(5-1, 0, -1, 1);
        if(diagonal1IsBingo) {
            lineOfBingo(0, 0, 1, 1);
        }
        if(diagonal2IsBingo) {
            lineOfBingo(0, 0, 1, 1);
        }
        for(let i=0; i<5; i++) {
            const rowIsbingo = checkLineSelected(i,0,0,1);
            const columnIsBingo = checkLineSelected(0, i, 1, 0)
            if(rowIsbingo) lineOfBingo(i, 0, 0, 1);
            if(columnIsBingo) lineOfBingo(0, i, 1, 0);
        }
    }

    // compare elements of two arrays
    const compareTwoArrays = (arr1, arr2) => {
        return JSON.stringify(arr1) == JSON.stringify(arr2)
    }

    // iniate the matrice
    const fillMatrice = () => {
        let bingoMatrix_selected_states = [];
        for(let i=0; i<5; i++){
            let row = [];
            for(let j=0; j<5; j++) {
                row = [...row,new CardItem(default_data[i][j], i==2 && j==2 ? true: false)];
            }
            bingoMatrix_selected_states = [...bingoMatrix_selected_states, row];
        }
        return bingoMatrix_selected_states
    }

    // check if there is a bing in the matrice
    const selectItem = (x, y) => {
        if(x == 2 && y == 2) return;
        setIsBingo(false);
        if( bingoMatrix_selected_states[x][y].isSelected) {
            setOldBingos(prevState => {
                const newstate = prevState.filter(item => !item.includes(''+x+y));
                return newstate;
            })
        }

        setBingoMatrix_selected_states(prevMatrice => {
            const test = prevMatrice.map((columns,index) => columns.map((column,index2) => {
                    if (index==x && index2==y) {
                        return new CardItem(column.text, !column.isSelected);
                    }
                    return column;
                })
            )
            return test;
        });
    }

    return (
        <div className='grid mt-6 md:mt-0 2xl:mt-20 w-11/12 text-center grid-cols-5 justify-items-center md:w-9/12 m-auto'>
            {
                bingoMatrix_selected_states.length > 0 && bingoMatrix_selected_states.map((columns, x) => {
                    return columns.map((column, y) => {
                        return <button className={classNames('card mt-0 mx-4 my-4 text-sm w-11/12 px-0 py-2 md:my-2 md:text-xs',{'active': bingoMatrix_selected_states[x][y].isSelected})} key={x+y} onClick={e => selectItem(x, y)}>{column.text}</button>
                    })
                })
            }
        </div>
    );
};
