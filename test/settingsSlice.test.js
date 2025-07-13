import reducer, { setLanguage } from '../src/store/settingsSlice';

describe('settingsSlice reducer', () => {
  const initialState = { language: 'en' };

  it('should return the initial state', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set language to "tr"', () => {
    const state = reducer(initialState, setLanguage('tr'));
    expect(state.language).toBe('tr');
  });
});