import { getCellId } from '../';
import {
  sortStates,
  initialSortState,
  getSortState,
  defaultSortRows,
} from '../sorting';

describe('sorting tools', () => {
  it('should export an object of sorting states', () => {
    expect(sortStates).toMatchSnapshot();
  });

  it('should define an initial sort state', () => {
    expect(initialSortState).toBeDefined();
    expect(initialSortState).toBe(sortStates.NONE);
  });

  describe('#getSortState', () => {
    it('should cycle through sortStates when on the same header', () => {
      expect(getSortState('a', 'a', sortStates.NONE)).toBe(sortStates.DESC);
      expect(getSortState('a', 'a', sortStates.DESC)).toBe(sortStates.ASC);
      expect(getSortState('a', 'a', sortStates.ASC)).toBe(sortStates.NONE);
      expect(getSortState('a', 'a', sortStates.NONE)).toBe(sortStates.DESC);
    });

    it('should reset the state when switching headers', () => {
      expect(getSortState('a', 'a', sortStates.NONE)).toBe(sortStates.DESC);
      expect(getSortState('a', 'b', sortStates.DESC)).toBe(sortStates.DESC);
    });
  });

  describe('#defaultSortRows', () => {
    let mockArgs;
    let mockHeader;

    beforeEach(() => {
      mockHeader = 'header';
      mockArgs = {
        rowIds: ['a', 'b', 'c'],
        cellsById: {
          [getCellId('a', mockHeader)]: {
            value: 'c',
          },
          [getCellId('b', mockHeader)]: {
            value: 'b',
          },
          [getCellId('c', mockHeader)]: {
            value: 'a',
          },
        },
        direction: sortStates.ASC,
        key: mockHeader,
        locale: 'en',
      };
    });

    it('should sort the given rows', () => {
      expect(defaultSortRows(mockArgs)).toMatchSnapshot();
      expect(
        defaultSortRows({ ...mockArgs, direction: sortStates.ASC })
      ).toMatchSnapshot();
    });
  });
});
