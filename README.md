## Mars Rover refactoring kata

We need to improve the existing solution that translates commands sent from Earth to instructions that are understood by our Rover on Mars

Currently, the code is very complicated and tangled, so we'd like you to invest some time to clean it up

### Functional requirements
```
Given:
 - a two dimensional map of Mars
 - the initial starting point and direction of the Rover
 
When:
 - a command is received
   move `forward` or `backward` or rotate `left` or `right` (90 degrees)
Then:
 - move the Rover
   if the Rover disappears over the edge of the map (the horizon), continue on the other side (remember, Mars is a sphere)
```

#### Bonus point 
After ensuring that the functional requirements have been met, as a bonus point represent graphically the position of the mars rover on a grid.

#### Bonus point 2

```
Given:
 - a list of obstacles with their exact location
 
When:
 - Rover moves
And:
 - Rover encounters an obstacle
Then:
 - report back the obstacle. The Rover should stay in its previous position
```
