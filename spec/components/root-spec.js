import jQuery from 'jquery';
import Root from '../../src/components/Root';
import Search from '../../src/components/Search';

describe('Root Module', () => {
  const SearchResults = [{
    image_path: 'some/path',
    original_title: 'some title',
    overview: 'some overview'
  }];
  let instance;

  beforeEach(() => {
    jQuery('body').html('');
    instance = new Root({
      $parent: jQuery('body')
    });
  });

  describe('#Root', () => {
    describe('.render', () => {
      it('should append Search container to wrapper', () => {
        expect(jQuery('body').children().length).toBe(0);

        instance.render();

        expect(jQuery('body').children()[0].className).toBe('wrapper');
      });

      it('should render search component', () => {
        spyOn(instance, 'renderSearch');

        instance.render();

        expect(instance.renderSearch).toHaveBeenCalled();
      });
    });

    describe('.renderSearch', () => {
      it('should initialize search component', () => {
        instance.searchContainer = '<div />';
        spyOn(Search.prototype, 'constructor');
        spyOn(Search.prototype, 'render');

        instance.renderSearch();

        expect(Search.prototype.render).toHaveBeenCalled();
      });
    });

    describe('.onSearchResults', () => {
      beforeEach(() => {
        spyOn(instance, 'renderList');
        spyOn(instance, 'destroyList');
      });

      it('should destroy previous search list', () => {
        instance.onSearchResults(SearchResults);

        expect(instance.destroyList).toHaveBeenCalled();
      });

      it('should render new list', () => {
        instance.onSearchResults(SearchResults);

        expect(instance.renderList).toHaveBeenCalledWith(SearchResults);
      });
    });
  });
});
