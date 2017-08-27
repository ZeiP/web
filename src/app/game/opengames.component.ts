import { Component, OnInit } from '@angular/core';
import { ApiService, OpenGamesResponse, SteamProfile, ProfileCacheService } from 'pydt-shared';

@Component({
  selector: 'pydt-open-games',
  templateUrl: './opengames.component.html'
})
export class OpenGamesComponent implements OnInit {
  openGames: OpenGamesResponse;
  profile: SteamProfile;

  constructor(private api: ApiService, private profileCache: ProfileCacheService) {
  }

  ngOnInit() {
    this.getGames();

    this.api.getSteamProfile().then(profile => {
      this.profile = profile;
    });
  }

  getGames() {
    this.api.listOpenGames().then(games => {
      // Go ahead and get all profiles for all the games in one request
      this.profileCache.getProfilesForGames(games.notStarted.concat(games.openSlots));
      this.openGames = games;
    });
  }
}
