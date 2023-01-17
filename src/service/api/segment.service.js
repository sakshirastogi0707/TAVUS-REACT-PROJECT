
import LogRocket from "logrocket";
import { UserService } from "../api/user-service";
class SegmentService {

  static async analyticsTrack(eventName, value) {
    const userData = await UserService.getUserProfile();
    value.userId = userData?.uuid;
    window.analytics.track(eventName, ({} = value));
    LogRocket.track(eventName, ({} = value));
  
    LogRocket.identify(userData?.uuid, {
      email: userData?.email
    });
  }
}
export { SegmentService };
