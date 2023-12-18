import { configureStore } from '@reduxjs/toolkit';
// import valveIntakeFormSlice from '../slices/valveForm/valveFormSlice';
// import camFormSlice from '../slices/camForm/camFormSlice';
// import springFormSlice from '../slices/springForm/springFormSlice';

const store = configureStore({
  reducer: {
    // valveIntakeForm: valveIntakeFormSlice,
    // camForm: camFormSlice,
    // springForm: springFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
