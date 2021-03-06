import {Component, OnInit} from '@angular/core';
import {locationNames} from "../../models/locationNames";
import {LocationTrackerService} from "../../services/location-tracker.service";
import {TeamDetailsService} from "../../services/team-details.service";
import {CountdownEvent} from "ngx-countdown";

@Component({
  selector: 'app-puzzledna',
  templateUrl: './puzzledna.component.html',
  styleUrls: ['./puzzledna.component.css']
})
export class PuzzlednaComponent implements OnInit {
  answer: string;
  correctAnswer: boolean = false;
  showHint: boolean = false;
  locationTracker: LocationTrackerService;
  teamDetailsService: TeamDetailsService;
  incorrect: boolean = false;
  config =
    {
      leftTime: 240,      // 4 mins
      format: ''
    };

  constructor(private _locationTracker: LocationTrackerService, private _teamDetailsService: TeamDetailsService) {
    this.locationTracker = _locationTracker
    this.teamDetailsService = _teamDetailsService;
  }

  ngOnInit(): void {
  }

  update(value: string) {
    this.answer = value;
    if (this.answer.trim().toLowerCase() == "plants") {
      this.correctAnswer = true;
      this.showHint = false;
      this.incorrect = false;
    } else {
      this.incorrect = true;
    }
  }

  onSelect() {
    this.locationTracker.currentStatus.set(locationNames.BotanicGardens, true);
  }

  handleEvent(event: CountdownEvent) {
    if (event.action == "done") {
      this.showHint = true;
      this.incorrect = false;
    }
  }
}
