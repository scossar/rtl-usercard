import UserCardView from 'discourse/views/user-card';

export default {
  name: 'reopen-for-rtl',
  initialize() {
    UserCardView.reopen({
      _willShow: function(target) {
        var dir = $('html').css('direction');

        if (!target) { return; }
        const width = this.$().width();

        Ember.run.schedule('afterRender', () => {
          if (target) {
            let position = target.offset();
            if (position) {

              if (dir === 'rtl') {
                //position.right = position.left;
                position.right = $(window).width() - position.left + 10;
                position.left = 'auto';
                const overage = ($(window).width() - 50) - (position.right + width);
                if (overage < 0) {
                  position.right += overage;
                  position.top += target.height() + 48;
                }
                position.top -= $('#main-outlet').offset().top;

              } else {
                // The site direction is ltr
                position.left += target.width() - 10;

                const overage = ($(window).width() - 50) - (position.left + width);
                if (overage < 0) {
                  position.left += overage;
                  position.top += target.height() + 48;
                }

                position.top -= $('#main-outlet').offset().top;
              }

              this.$().css(position);
            }
            this.appEvents.trigger('usercard:shown');
          }
        });
      }
    });
  }
}
