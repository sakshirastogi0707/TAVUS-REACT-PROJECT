import { urls } from "../../config/urlConfig";
import { HTTP } from "../core/http.service";
import {
  StorageKeys,
  StorageService,
  TempStorage,
} from "../../service/core/storage.service";
import AdminService from "./admin.service";

class UserService {
  static async getUserDetail(page) {
    const result = await HTTP.get(urls.getUserDetail);
    if (result.data) {
      return result.data.data;
    }
    return undefined;
  }

  static async getUserProfile() {
    return await AdminService.userDetails()
      .then(async (response) => {
        if (response?.data) return response?.data;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  static async getLatestCampaignId(key) {
    return await AdminService.userDetails()
      .then(async (response) => {
        if (response?.data?.campaign?.id) return response?.data?.campaign?.id;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  static async createCampaign(data) {
    const url = urls.createCampaign;
    const result = await HTTP.post(url, data);
    if (result.data) {
      return result.data.data;
    }
    return undefined;
  }

  static async userSteps(data) {
    const url = urls.userSteps;
    const result = await HTTP.put(url, data);
    if (result.data) {
      return result.data.data;
    }
    return undefined;
  }

  static async paragraphs() {
    const url = urls.paragraphs;
    const result = await HTTP.get(url);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }

  static async uploadVoices(data) {
    const url = urls.uploadVoices;
    const result = await HTTP.post(url, data);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }

  static async uploadVideoRecording(data) {
    const url = urls.uploadVideoRecording;
    const result = await HTTP.post(url, data);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }

  static async trainingPermisionVideo(data) {
    const url = urls.trainingPermisionVideo;
    const result = await HTTP.post(url, data);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }

  static async getCampaign(data) {
    const { campaignId } = data;
    const url = urls.getCampaignByPrimaryKey;
    const result = await HTTP.get(url + campaignId, data);
    if (result.data) {
      return result.data.data;
    }
    return undefined;
  }

  static async getFooterOptions(userData, is_mic, step) {
    let footerSteps = [];
    let invited_by = userData?.invited_by;
    switch (step) {
      case "registration":
        if (is_mic) {
          footerSteps = [
            { name: "Registration", value: "registration" },
            { name: "Invite Users", value: "invite" },
            { name: "Training", value: "training" },
            { name: "Script", value: "script" },
          ];
        } else {
          footerSteps = [
            { name: "Registration", value: "registration" },
            { name: "Invite Users", value: "invite" },
            { name: "Script", value: "script" },
            { name: "Landing Page", value: "landing" },
          ];
        }
        break;
      case "invite":
        if (is_mic) {
          footerSteps = [
            { name: "Registration", value: "registration" },
            { name: "Invite Users", value: "invite" },
            { name: "Script", value: "script" },
            { name: "Training", value: "training" },
          ];
        } else {
          footerSteps = [
            { name: "Registration", value: "registration" },
            { name: "Invite Users", value: "invite" },
            { name: "Script", value: "script" },
            { name: "Landing Page", value: "landing" },
          ];
        }
        break;
      case "training":
        if (is_mic) {
          if (invited_by) {
            footerSteps = [
              { name: "Script", value: "script" },
              { name: "Training", value: "training" },
              { name: "Video Recording", value: "script-recording" },
              { name: "Personalize Video", value: "template" },
            ];
          } else {
            footerSteps = [
              { name: "Invite Users", value: "invite" },
              { name: "Script", value: "script" },
              { name: "Training", value: "training" },
              { name: "Video Recording", value: "script-recording" },
            ];
          }
        } else {
          if (invited_by) {
            footerSteps = [
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
              { name: "Training", value: "training" },
              { name: "Video Recording", value: "script-recording" },
            ];
          } else {
            footerSteps = [
              { name: "Invite Users", value: "invite" },
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
              { name: "Training", value: "training" },
            ];
          }
        }
        break;
      case "script":
        if (is_mic) {
          if (invited_by) {
            footerSteps = [
              { name: "Script", value: "script" },
              { name: "Training", value: "training" },
              { name: "Video Recording", value: "script-recording" },
              { name: "Personalize Video", value: "template" },
            ];
          } else {
            footerSteps = [
              { name: "Invite Users", value: "invite" },
              { name: "Script", value: "script" },
              { name: "Training", value: "training" },
              { name: "Video Recording", value: "script-recording" },
            ];
          }
        } else {
          if (invited_by) {
            footerSteps = [
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
              { name: "Training", value: "training" },
              { name: "Video Recording", value: "script-recording" },
            ];
          } else {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Invite Users", value: "invite" },
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
            ];
          }
        }
        break;
      case "script-recording":
        if (is_mic) {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Landing Page", value: "landing" },
          ];
        } else {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Training Completed", value: "training-complete" },
          ];
        }
        break;
      case "background-video-setup":
        if (is_mic) {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Landing Page", value: "landing" },
          ];
        } else {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Training Complete", value: "training-complete" },
          ];
        }
        break;
      case "template":
        if (is_mic) {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Landing Page", value: "landing" },
          ];
        } else {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Training Complete", value: "training-complete" },
          ];
        }
        break;
      case "landing":
        if (is_mic) {
          footerSteps = [
            { name: "Video Recording", value: "script-recording" },
            { name: "Personalize Video", value: "template" },
            { name: "Background Video", value: "background-video-setup" },
            { name: "Landing Page", value: "landing" },
          ];
        } else {
          if (invited_by) {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
              { name: "Training", value: "training" },
            ];
          } else {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Invite Users", value: "invite" },
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
            ];
          }
        }
        break;
      case "microphone":
        if (is_mic) {
          if (invited_by) {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Training", value: "training" },
              { name: "Script", value: "script" },
              { name: "Training", value: "training" },
            ];
          } else {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Invite Users", value: "invite" },
              { name: "Training", value: "training" },
              { name: "Script", value: "script" },
            ];
          }
        } else {
          if (invited_by) {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
              { name: "Training", value: "training" },
            ];
          } else {
            footerSteps = [
              { name: "Registration", value: "registration" },
              { name: "Invite Users", value: "invite" },
              { name: "Script", value: "script" },
              { name: "Landing Page", value: "landing" },
            ];
          }
        }
        break;
      case "training-complete":
        if (is_mic) {
          footerSteps = [
            { name: "Landing Page", value: "landing" },
            { name: "Training Complete", value: "training-complete" },
            { name: "Set Identifier", value: "set-variable" },
            { name: "Finish", value: "first-video" },
          ];
        } else {
          footerSteps = [
            { name: "Background Video", value: "background-video-setup" },
            { name: "Training Complete", value: "training-complete" },
            { name: "Set Identifier", value: "set-variable" },
            { name: "Finish", value: "first-video" },
          ];
        }
        break;
      case "set-variable":
        if (is_mic) {
          footerSteps = [
            { name: "Landing Page", value: "landing" },
            { name: "Training Complete", value: "training-complete" },
            { name: "Set Identifier", value: "set-variable" },
            { name: "Finish", value: "first-video" },
          ];
        } else {
          footerSteps = [
            { name: "Background Video", value: "background-video-setup" },
            { name: "Training Complete", value: "training-complete" },
            { name: "Set Identifier", value: "set-variable" },
            { name: "Finish", value: "first-video" },
          ];
        }
        break;
      case "first-video":
        if (is_mic) {
          footerSteps = [
            { name: "Landing Page", value: "landing" },
            { name: "Training Complete", value: "training-complete" },
            { name: "Set Identifier", value: "set-variable" },
            { name: "Finish", value: "first-video" },
          ];
        } else {
          footerSteps = [
            { name: "Background Video", value: "background-video-setup" },
            { name: "Training Complete", value: "training-complete" },
            { name: "Set Identifier", value: "set-variable" },
            { name: "Finish", value: "first-video" },
          ];
        }
        break;
      default:
    }
    return footerSteps;
  }

  static async getFooterOptionsAlreadyCreatedCampaign(userData, is_mic, step) {
    let footerSteps = [];
    switch (step) {
      case "script":
      case "introducing-voices":
      case "my-voices":
      case "voices-name":
      case "training":
      case "script-recording":
      case "template":
        footerSteps = [
          { name: "Script", value: "script" },
          { name: "Voice", value: "introducing-voices" },
          { name: "Video Recording", value: "script-recording" },
          { name: "Personalize Video", value: "template" },
        ];
        break;
      case "background-video-setup":
      case "landing":
      case "training-complete":
      case "set-variable":
        footerSteps = [
          { name: "Background Video", value: "background-video-setup" },
          { name: "Landing Page", value: "landing" },
          { name: "Training Complete", value: "training-complete" },
          { name: "Set Identifier", value: "set-variable" },
        ];
        break;
      case "first-video":
        footerSteps = [
          { name: "Landing Page", value: "landing" },
          { name: "Training Complete", value: "training-complete" },
          { name: "Set Identifier", value: "set-variable" },
          { name: "Finish", value: "first-video" },
        ];
        break;
      default:
    }
    return footerSteps;
  }

  static async getCampaignRoute(steps) {
    let footerSteps = "";
    switch ("false") {
      case steps?.script:
        return (footerSteps = "/script");
        break;
      case steps?.voice:
        return (footerSteps = "/introducing-voices");
        break;
      case steps?.script_recording:
        return (footerSteps = "/script-recording");
        break;
      case steps?.template:
        return (footerSteps = "/template");
        break;
      case steps?.background_video:
        return (footerSteps = "/background-video-setup");
        break;
      case steps?.landing:
        return (footerSteps = "/landing");
        break;
      case steps?.training_complete:
        return (footerSteps = "/training-complete");
        break;
      case steps?.set_variable:
        return (footerSteps = "/set-variable");
        break;
      case steps?.first_video:
        return (footerSteps = "/first-video");
        break;
      default:
    }
    return footerSteps;
  }

  static async getTraining(campaign_id) {
    const url = `${urls.campaignTraining}/${campaign_id}`;
    const result = await HTTP.get(url);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }

  static async DownloadCsv(
    status,
    campaignId,
    qaStatus,
    bulkRequestId
    // searchValue1,
    // searchValue2,
    // startDate,
    // endDate
  ) {
    var url = `${urls.requestsDownload}?`;
    if (status) {
      url += `&status=${status}`;
    }
    if (campaignId) {
      url += `&campaignId=${campaignId}`;
    }
    if (qaStatus) {
      url += `&qaStatus=${qaStatus}`;
    }
    if (bulkRequestId) {
      url += `&bulkRequestId=${bulkRequestId}`;
    }
    // if (searchValue1) {
    //   url += `&request_id=${searchValue1}`;
    // }
    // if (searchValue2) {
    //   url += `&title=${searchValue2}`;
    // }
    // if (startDate && endDate) {
    //   url += `status=&created_before=${startDate}&created_after=${endDate}`;
    // }

    const result = await HTTP.get(url);
    if (result.data) {
      return result.data;
    }
    return undefined;
  }
}

export { UserService };
