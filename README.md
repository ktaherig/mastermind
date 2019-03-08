# Summary

This project game is based on the "[JavaScript project-based tutorial](https://www.youtube.com/playlist?list=PLe2fdRcC99C4InmFLSDzd0dK_RPylxq9k)" youtube educational series by [Michael Dowd](http://www.mikedowd300.com/). The game makes use of jQuery.

### Gameplay

The objective of Mastermind is to pick four pegs of any color from the available pegs (by clicking on the available options at the bottom) and then clicking on the available openings in an effort to get the pegs in the right order. The correct answer is produced randomly with each page-refresh. On the right side of the gameboard, there is also a series of dots that help you figure out the answer.

The number of black dots represent how many pegs you've guessed of both the right color and the right location. The number of white dots represent the pegs you've guessed that are the right color, but are not in the right place.

For example, imagining that the correct answer turns out to be, let's say:
```
Yellow, Green, Orange, Black
```
and you guessed:
```
Black, Green, Orange, Red
```
For this, the "grade" for that particular turn would be two black dots and one white dot, meaning that two of the pegs  you've guessed (represented by the black dots: in this case, Green and Orange, though you wouldn't specifically know that) are the right color and also are in the right place, and that one of the pegs you've guessed (represented by the white dot: in this case, Black) is right, but in the wrong place.

Following this, you'd have to proceed to guess the right series of colors before running out of space.

### Notice

It is highly recommendable that you play this game on either Chrome or Opera, or (probably, I'm assuming) Safari. As far as I've tested it, the game doesn't work on either Pale Moon or Firefox, but it does work perfectly fine on Chrome and Opera.
