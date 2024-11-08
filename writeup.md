# Project Write-Up

## Rationale for Design Decisions
Your rationale for design decisions goes here. Explain why you chose specific visual encodings and interaction techniques.

Our group sought to display the growth of Costco across the United States, over time. There are two main components to display this data-- geographic location
and time data. We have an interactive bar where a user can scrub through each month from 1978 to 2020 that will display all the Costcos opened on or before this 
date, on a map of the US. If the user does not interact with the time bar, it will automatically proceed in a chronological order, but the user can manually pause
this progression. Our encodings are as follows:
Mark: Circle
Color: Red
X-axis: Longitude (Q-interval)
Y-axis: Latitude (Q-interval)
+
Mark: Text
X: Month, Year (Ordinal)
+
Mark: US map
Color: Grey
X: Longitude (Q-interval)
Y: Latitude  (Q-interval)

While just printed out the coordinates of each Costco presents a map that looks similar to the map of the US, we thougth that overlaying this data on the mp of the
US is much mor eexplicit and easier to interpret. Including the mp with state lines alows for more granular insights on the presence of Costcos in specific states 
and in specific cities. Moreover, we decided to map the circles for each Costco red as that corresponds to the logo of Costco. The color red is striking against the
grey map. While this data set included international Costcos, we made the conscious design choice to restrict our data to the US as Costco is the most abundant in 
the US, and also started here. We hypothesized that a larger map that included the entire world would prove difficult to see on one web page and some of the granularity
in the data set would be lost due to the scale. 

Lastly, as our main visualization is based on the chronological spread of Costco, we thought it was most fitting for the user to be able to interact with the time 
variable. This allows to user some insights into how the company spread both geographically and chronologically. Perhpas if we were to continue working on this
project we could allow a user to filter by state or city, or the mouse over each Costco and see additional details such as it's adresss, opening hours, and 
specialty departments. 





## Overview of Development Process
Describe how the work was split among team members, total time spent, and challenges faced during development.

Our group was able to come up with an idea for our data pretty easily, especially due to the help of the examples on the D3 website. Our two main challenges while 
working on this project were (a) properly loading in and accessing our data from a csv file and (b) making sure the circles on the map properly appeared in correspondance
with the date bar. As for challenge (a), D3 provided quite good examples, but had data in a different format, so we needed to figure out how to change the data loading 
process to fit our data. For challenge (b), ....
