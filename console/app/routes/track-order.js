import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TrackOrderRoute extends Route {
    @service router;

    beforeModel(transition) {
        const order = transition?.to?.queryParams?.order;
        if (order) {
            return this.router.transitionTo('virtual', 'track-order', {
                queryParams: { order },
            });
        }
        return this.router.transitionTo('virtual', 'track-order');
    }
}
