export interface ResponseVideoFormatModel {
  itag: number;
  url?: string;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  lastModified: string;
  quality: string;
  fps: number;
  qualityLabel: string;
  projectionType: string;
  audioQuality?: string;
  approxDurationMs: string;
  audioSampleRate?: string;
  audioChannels?: number;

  initRange?: {
    start: string;
    end: string;
  };
  indexRange?: {
    start: string;
    end: string;
  };
  contentLength?: string;
  averageBitrate?: number;
}

export interface ResponseCaptionsModel {
  playerCaptionsTracklistRenderer: {
    captionTracks: {
      baseUrl: string;
      name: {
        simpleText: string;
      };
      vssId: string;
      languageCode: string;
      isTranslatable: boolean;
      trackName: string;
    }[];
    audioTracks: {
      captionTrackIndices: [number, number];
      defaultCaptionTrackIndex: number;
      visibility: string;
      hasDefaultTrack: boolean;
      captionsInitialState: string;
    }[];
    translationLanguages: {
      languageCode: string;
      languageName: {
        simpleText: string;
      };
    }[];
    defaultAudioTrackIndex: number;
    openTranscriptCommand: {
      clickTrackingParams: string;
      changeEngagementPanelVisibilityAction: {
        targetId: string;
        visibility: string;
      };
    };
  };
}

export interface ResponseVideoInfoModel {
  responseContext: {
    visitorData: string;
    serviceTrackingParams: {
      service: string;
      params: {
        key: string;
        value: string;
      }[];
    }[];
    maxAgeSeconds: number;
    mainAppWebResponseContext: {
      loggedOut: boolean;
      trackingParam: string;
    };
    webResponseContextExtensionData: {
      hasDecorated: boolean;
    };
  };
  playabilityStatus: {
    status: string;
    playableInEmbed: boolean;
    offlineability: {
      offlineabilityRenderer: {
        offlineable: boolean;
        formats: [
          {
            name: {
              runs: {
                text: string;
              }[];
            };
            formatType: string;
            availabilityType: string;
            savedSettingShouldExpire: boolean;
          },
          {
            name: {
              runs: {
                text: string;
              }[];
            };
            formatType: string;
            availabilityType: string;
            savedSettingShouldExpire: boolean;
          },
          {
            name: {
              runs: {
                text: string;
              }[];
            };
            formatType: string;
            availabilityType: string;
            savedSettingShouldExpire: boolean;
          },
        ];
        clickTrackingParams: string;
      };
    };
    miniplayer: {
      miniplayerRenderer: {
        playbackMode: string;
      };
    };
    contextParams: string;
  };
  streamingData: {
    expiresInSeconds: string;
    formats: ResponseVideoFormatModel[];
    adaptiveFormats: ResponseVideoFormatModel[];
    serverAbrStreamingUrl: string;
  };
  playbackTracking: {
    videostatsPlaybackUrl: {
      baseUrl: string;
    };
    videostatsDelayplayUrl: {
      baseUrl: string;
    };
    videostatsWatchtimeUrl: {
      baseUrl: string;
    };
    ptrackingUrl: {
      baseUrl: string;
    };
    qoeUrl: {
      baseUrl: string;
    };
    atrUrl: {
      baseUrl: string;
      elapsedMediaTimeSeconds: number;
    };
    videostatsScheduledFlushWalltimeSeconds: number[];
    videostatsDefaultFlushIntervalSeconds: number;
  };
  captions: ResponseCaptionsModel;
  videoDetails: {
    videoId: string;
    title: string;
    lengthSeconds: string;
    keywords: string[];
    channelId: string;
    isOwnerViewing: boolean;
    shortDescription: string;
    isCrawlable: boolean;
    thumbnail: {
      thumbnails: {
        url: string;
        width: number;
        height: number;
      }[];
    };
    allowRatings: boolean;
    viewCount: string;
    author: string;
    isLowLatencyLiveStream: boolean;
    isPrivate: boolean;
    isUnpluggedCorpus: boolean;
    latencyClass: string;
    isLiveContent: boolean;
  };
  playerConfig: {
    audioConfig: {
      loudnessDb: number;
      perceptualLoudnessDb: number;
      enablePerFormatLoudness: boolean;
    };
    streamSelectionConfig: {
      maxBitrate: string;
    };
    mediaCommonConfig: {
      dynamicReadaheadConfig: {
        maxReadAheadMediaTimeMs: number;
        minReadAheadMediaTimeMs: number;
        readAheadGrowthRateMs: number;
      };
      mediaUstreamerRequestConfig: {
        videoPlaybackUstreamerConfig: string;
      };
      serverPlaybackStartConfig: {
        enable: boolean;
        playbackStartPolicy: {
          startMinReadaheadPolicy: {
            minReadaheadMs: number;
          }[];
        };
      };
    };
    webPlayerConfig: {
      useCobaltTvosDash: boolean;
      webPlayerActionsPorting: {
        getSharePanelCommand: {
          clickTrackingParams: string;
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean;
              apiUrl: string;
            };
          };
          webPlayerShareEntityServiceEndpoint: {
            serializedShareEntity: string;
          };
        };
        subscribeCommand: {
          clickTrackingParams: string;
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean;
              apiUrl: string;
            };
          };
          subscribeEndpoint: {
            channelIds: string[];
            params: string;
          };
        };
        unsubscribeCommand: {
          clickTrackingParams: string;
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean;
              apiUrl: string;
            };
          };
          unsubscribeEndpoint: {
            channelIds: string[];
            params: string;
          };
        };
        addToWatchLaterCommand: {
          clickTrackingParams: string;
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean;
              apiUrl: string;
            };
          };
          playlistEditEndpoint: {
            playlistId: string;
            actions: {
              addedVideoId: string;
              action: string;
            }[];
          };
        };
        removeFromWatchLaterCommand: {
          clickTrackingParams: string;
          commandMetadata: {
            webCommandMetadata: {
              sendPost: boolean;
              apiUrl: string;
            };
          };
          playlistEditEndpoint: {
            playlistId: string;
            actions: {
              action: string;
              removedVideoId: string;
            }[];
          };
        };
      };
    };
  };
  storyboards: {
    playerStoryboardSpecRenderer: {
      spec: string;
      recommendedLevel: number;
      highResolutionRecommendedLevel: number;
    };
  };
  microformat: {
    playerMicroformatRenderer: {
      thumbnail: {
        thumbnails: {
          url: string;
          width: number;
          height: number;
        }[];
      };
      embed: {
        iframeUrl: string;
        width: number;
        height: number;
      };
      title: {
        simpleText: string;
      };
      description: {
        simpleText: string;
      };
      lengthSeconds: string;
      ownerProfileUrl: string;
      externalChannelId: string;
      isFamilySafe: boolean;
      availableCountries: string[];
      isUnlisted: boolean;
      hasYpcMetadata: boolean;
      viewCount: string;
      category: string;
      publishDate: string;
      ownerChannelName: string;
      liveBroadcastDetails: {
        isLiveNow: boolean;
        startTimestamp: string;
        endTimestamp: string;
      };
      uploadDate: string;
      isShortsEligible: boolean;
    };
  };
  cards: {
    cardCollectionRenderer: {
      cards: {
        cardRenderer: {
          teaser: {
            simpleCardTeaserRenderer: {
              message: {
                simpleText: string;
              };
              trackingParams: string;
              prominent: boolean;
              logVisibilityUpdates: boolean;
              onTapCommand: {
                clickTrackingParams: string;
                changeEngagementPanelVisibilityAction: {
                  targetId: string;
                  visibility: string;
                };
              };
            };
          };
          cueRanges: {
            startCardActiveMs: string;
            endCardActiveMs: string;
            teaserDurationMs: string;
            iconAfterTeaserMs: string;
          }[];
          trackingParams: string;
        };
      }[];
      headerText: {
        simpleText: string;
      };
      icon: {
        infoCardIconRenderer: {
          trackingParams: string;
        };
      };
      closeButton: {
        infoCardIconRenderer: {
          trackingParams: string;
        };
      };
      trackingParams: string;
      allowTeaserDismiss: boolean;
      logIconVisibilityUpdates: boolean;
    };
  };
  trackingParams: string;
  attestation: {
    playerAttestationRenderer: {
      challenge: string;
      botguardData: {
        program: string;
        interpreterSafeUrl: {
          privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;
        };
        serverEnvironment: number;
      };
    };
  };
  adBreakHeartbeatParams: string;
  frameworkUpdates: {
    entityBatchUpdate: {
      mutations: {
        entityKey: string;
        type: string;
        payload: {
          offlineabilityEntity: {
            key: string;
            offlineabilityRenderer: string;
            addToOfflineButtonState: string;
            contentCheckOk: boolean;
            racyCheckOk: boolean;
            loggingDirectives: {
              trackingParams: string;
              visibility: {
                types: string;
              };
              enableDisplayloggerExperiment: boolean;
            };
          };
        };
      }[];
      timestamp: {
        seconds: string;
        nanos: number;
      };
    };
  };
}
