import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Transferencia } from '../../interface.ts/transferencia';

export interface transferenciaInitialSate {
    movimientos: Transferencia[];
    loadingMovimiento: boolean;
    errorMessageMovimiento?: string | null;
}

const initialState: transferenciaInitialSate = {
    movimientos: [],
    loadingMovimiento: false,
    errorMessageMovimiento: null

}

export const movimientosSlice = createSlice({
    name: 'movimiento',
    initialState,
    reducers: {
        onStartTranferenciaLoading: (state: transferenciaInitialSate) => {
            state.loadingMovimiento = true;
            state.errorMessageMovimiento = null;
        },
        onTransferenciaLoaded: (state: transferenciaInitialSate, action: PayloadAction<Transferencia[]>) => {
            state.loadingMovimiento = false; // Desactiva la carga
            state.movimientos = action.payload; // Asigna transferencias
            state.errorMessageMovimiento = null; // Limpia errores
        },
        onError: (state: transferenciaInitialSate, action: PayloadAction<string>) => {
            state.loadingMovimiento = false;
            state.errorMessageMovimiento = action.payload;
        },
        onAddTransferencia: (state: transferenciaInitialSate, action: PayloadAction<Transferencia>) => {
            state.movimientos.push(action.payload)
        },
        onRemoveTodo: (state: transferenciaInitialSate, action: PayloadAction<number>) => {
            state.movimientos = state.movimientos.filter((trans) => trans.id !== action.payload)
        },
        onUpdateTransferencia: (state: transferenciaInitialSate, action: PayloadAction<Transferencia>) => {
            const index = state.movimientos.findIndex(
                (transa) => transa.id === action.payload.id
            );
            if (index !== -1) {
                state.movimientos[index] = action.payload;
            }
        }
    }
});

export const {
    onStartTranferenciaLoading,
    onTransferenciaLoaded,
    onError,
    onAddTransferencia,
    onRemoveTodo,
    onUpdateTransferencia } = movimientosSlice.actions

//export default movimientosSlice.reducer