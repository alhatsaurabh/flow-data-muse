---
title: "British Airways Customer Experience Analysis: A Tableau Case Study"
description: A comprehensive analysis of British Airways customer experience
  revealing key satisfaction trends across time, geography, and aircraft types
  to identify improvement opportunities and strengths.
image: /images/gettyimages-1558703841-612x612.jpg
tags:
  - R
  - Tableau
  - Healthcare Analytics
category: Aviation
github: ""
liveDemo: https://public.tableau.com/views/Book1_17428894334940/Dashboard1?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link
featured: true
draft: false
slug: healthcare-patient-flow
---
## Executive Summary

This case study explores a comprehensive analysis of British Airways customer satisfaction data from 2016 to 2023. Using Tableau Public, I developed an interactive dashboard that visualizes key metrics across different dimensions including time, geography, aircraft type, and service categories. The analysis provides valuable insights into the airline's performance trends, helping identify strengths and areas for improvement in the customer experience.

**Project in One Line**: A comprehensive analysis of British Airways customer experience revealing key satisfaction trends across time, geography, and aircraft types to identify improvement opportunities and strengths.

## Project Overview

### Objectives

* Analyze British Airways customer satisfaction ratings across multiple dimensions
* Identify trends in overall customer satisfaction over time
* Compare performance across different aircraft types and routes
* Visualize geographic variations in customer sentiment
* Break down performance by specific service categories

### Data Sources

The analysis utilizes customer review data for British Airways spanning from March 2016 to October 2023. The dataset includes:

* Overall satisfaction ratings
* Service-specific ratings (cabin staff, entertainment, food/beverages, ground service, seat comfort)
* Aircraft information
* Traveler demographics (business, leisure, family travelers)
* Geographic data by country

## Dashboard Features & Narrative Flow

![Dashboard 1](/images/screenshot-2025-04-26-at-2.16.31 pm.png "British Airway Dashboard")

The dashboard follows a logical narrative structure that guides stakeholders through progressively deeper insights:

### 1. Key Performance Overview

!\[Dashboard KPI Section]

**Key Metrics at a Glance:**

* Overall average rating: 4.2/5
* Service category breakdown:

  * Cabin Staff Service: 3.3/5
  * Entertainment: 1.4/5
  * Food & Beverages: 2.4/5
  * Ground Service: 3.0/5
  * Seat Comfort: 2.9/5
  * Value for Money: 2.8/5

**Insight**: British Airways achieves solid overall satisfaction (4.2/5), with cabin staff being their strongest asset (3.3/5) while entertainment systems represent their biggest opportunity for improvement (1.4/5). The stark contrast between the highest and lowest performing categories suggests where resources would be best allocated for maximum impact on customer experience.

### 2. Temporal Analysis

!\[Time Series Chart]

**Time Series Analysis Features:**

* Line chart displaying the average overall rating by month from 2017 to 2023
* Shows fluctuations in customer sentiment over time, revealing seasonal patterns and general trends

**Insight**: Customer satisfaction has shown significant volatility between 2017-2023, with peaks reaching nearly 6.0 and valleys dipping below 2.0. This volatility suggests inconsistent service delivery or passenger experience, potentially tied to operational changes, staffing fluctuations, or external factors affecting the airline industry. The most recent trend shows a concerning downward trajectory that merits further investigation.

### 3. Geographic Performance Distribution

!\[World Map Visualization]

**Geographic Analysis Features:**

* A world map visualization showing the average rating by country
* Color gradient indicates satisfaction levels across different regions

**Insight**: Satisfaction varies considerably by geography, with stronger performance in regions displayed in darker green and opportunities for improvement in lighter-colored areas. This geographic disparity may reflect route-specific differences, aircraft allocation, crew training consistency, or varying cultural expectations about airline service. Identifying high-performing regions can provide models for improvement in underperforming markets.

### 4. Aircraft Fleet Performance

!\[Aircraft Comparison Chart]

**Aircraft Performance Comparison Features:**

* Bar chart comparing average ratings across different aircraft types
* Includes the number of reviews for each aircraft type to provide context on the volume of feedback

**Insight**: The Boeing 747-400 delivers the strongest passenger experience (4.7/5) despite newer aircraft in the fleet, while the A321 shows the lowest satisfaction (3.6/5). This counterintuitive finding suggests that aircraft configuration, cabin layout, and service model may be more important than aircraft age in determining customer satisfaction. The significant variation between aircraft types (4.7 vs 3.6) reveals an opportunity to standardize the best elements of the passenger experience across the entire fleet.

### 5. Interactive Elements

!\[Filter Options]

**Interactive Filters:**

* Month range selector allowing temporal analysis
* Traveler type filter (All, Business, Couple Leisure, Family Leisure)
* Seat type filter (Economy, Business Class, First Class, Premium Economy)
* Aircraft type selector to focus on specific fleet segments
* Continent filter for regional analysis

**Insight**: The interactive nature of these filters reveals substantially different experiences across customer segments. For example, business travelers rate certain aspects of the experience differently than leisure travelers, suggesting the need for targeted service improvements based on customer segment.

## Key Insights & Findings

### Strengths

* **Cabin Staff Service Excellence**: Consistently receives higher ratings (3.3/5) than other service categories, suggesting that British Airways' human element is a key strength of their customer experience and should be leveraged in marketing and further enhanced.
* **Boeing 747-400 Superior Experience**: Shows the highest customer satisfaction with a rating of 4.7/5, though it has fewer reviews (97) compared to other aircraft types. The airline should study what makes this aircraft configuration superior to replicate its success.
* **Geographic Success Pockets**: Rating patterns show specific regions where British Airways performs better than average, providing models for success that could be applied to underperforming routes.

### Areas for Improvement

* **Entertainment System Deficiency**: The significantly low average rating (1.4/5) for entertainment systems represents the most critical improvement opportunity. This may require system upgrades, content expansion, or reliability improvements.
* **Food and Value Concerns**: Food and beverage offerings (2.4/5) and value for money (2.8/5) both score below the overall average, indicating potential areas to enhance customer satisfaction through menu revisions and pricing strategy adjustments.
* **Inconsistent Experience**: The time series analysis shows dramatic fluctuations in overall ratings, pointing to inconsistent service delivery that needs standardization.

### Hidden Patterns

* **Aircraft-Specific Satisfaction**: There is no clear correlation between aircraft age and satisfaction, with older models sometimes outperforming newer additions to the fleet. This suggests that cabin configuration and service model may matter more than aircraft generation.
* **Feedback Volume Variation**: The number of reviews varies significantly by aircraft type, with models like the A320 receiving more feedback (263 reviews) than others, potentially indicating routes with more engaged customers or higher complaint rates.
* **Seasonal Patterns**: The time series analysis reveals potential seasonal fluctuations that could inform staffing and service planning throughout the year.

## Recommendations

Based on the analysis, several opportunities for improvement can be identified:

1. **Entertainment System Overhaul** - The consistently low rating for in-flight entertainment (1.4/5) warrants a strategic investment in upgrading these systems, content offerings, and reliability across the fleet.
2. **Culinary Experience Enhancement** - Develop a revised food and beverage program addressing the relatively low satisfaction (2.4/5), potentially incorporating successful elements from higher-rated routes or partnering with recognized culinary brands.
3. **Service Standardization Initiative** - Address the significant fluctuations in ratings by implementing more rigorous service standards, training programs, and quality control measures to ensure consistency.
4. **Fleet Experience Harmonization** - Study the successful elements of the Boeing 747-400 experience and systematically apply these learnings to other aircraft in the fleet, particularly the lower-performing models.
5. **Geographic Performance Equalization** - Develop market-specific action plans for regions showing below-average satisfaction, potentially including targeted crew training or service modifications based on cultural preferences.
6. **Segmented Service Models** - Create more differentiated service approaches for business versus leisure travelers based on the analysis of segment-specific feedback patterns.

## Dashboard Presentation & Usage

The dashboard's organization allows stakeholders to:

1. **Start with the big picture** - The KPI summary at the top provides immediate context on overall performance
2. **Identify patterns over time** - The time series visualization helps identify trends and anomalies
3. **Recognize geographic variations** - The map visualization highlights regional strengths and weaknesses
4. **Compare fleet performance** - The aircraft comparison highlights which planes deliver the best experience
5. **Drill down using filters** - Interactive elements allow for deeper investigation into specific segments

This logical flow guides users from high-level insights to actionable details, making the dashboard both informative and practical for decision-making.

## Project Methodology

The analysis was developed using Tableau Public, following these steps:

1. **Data preparation** - Gathered and processed British Airways customer review data spanning multiple years
2. **Dashboard design** - Created an intuitive layout with complementary visualizations following a logical narrative flow
3. **Interactive elements** - Implemented filters to allow for dynamic exploration of the data
4. **Performance optimization** - Ensured the dashboard loads efficiently even with substantial data
5. **Publication** - Made the dashboard accessible on Tableau Public for stakeholder review

## Conclusion

This Tableau dashboard provides British Airways with actionable insights into customer satisfaction across multiple dimensions. By focusing on the identified areas for improvement while leveraging existing strengths, the airline can enhance overall customer experience and loyalty.

The interactive nature of the dashboard allows stakeholders to explore specific aspects of the data, making it a valuable tool for decision-making across various departments including customer experience, operations, and marketing. The narrative flow from overview metrics to specific insights creates a compelling story that drives understanding and action.

This project demonstrates the power of data visualization in uncovering insights that can drive business improvements in the airline industry, transforming raw customer feedback into a strategic asset for service enhancement.