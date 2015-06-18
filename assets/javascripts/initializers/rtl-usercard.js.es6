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
              position.left += target.width() - 10;

              if (dir === 'rtl') {
                position.right = position.left;
                const overage = ($(window).width() - 50) - (position.right + width);
                if (overage < 0) {
                  position.right += overage;
                }
                position.top += target.height() + 18;
                position.top -= $('#main-outlet').offset().top;

              } else {
                // The site direction is ltr
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
