(ns tryclojure.views.tutorial
  (:require [noir.core :refer [defpartial defpage]]
            [hiccup.element :refer [javascript-tag link-to unordered-list]]
            [hiccup.page :refer [include-css include-js html5]]
            [tryclojure.views.template :refer [root-html]]))

(defpartial tutorial-nav []
  [:table.table.table-striped.table-bordered
    [:thead
      [:th "Tutorial"]
      [:th "Description"]]
    [:tbody
      [:tr
        [:td "Tutorial 1"]
        [:td "Learn to add two numbers together... HARDCORE!"]]
      [:tr
        [:td "Tutorial 2"]
        [:td "Work with a local variable."]]]])

(defpartial tutorial-main []
  [:div.row-fluid
    [:div.span12.container
      [:h2 "Tutorials"]
      [:p "These tutorials are designed to help you get started using Clojure, they are primarily based on the clojure-kloans project as a good starting point"]]]
  [:div.row-fluid
    [:div.span12.container
      (tutorial-nav)]])

(defpartial tutorial-html [& {:keys [interactive-tutorial-html] :or {interactive-tutorial-html nil}}]
  (interactive-tutorial-html)

  [:div.row-fluid
    [:div.span12.container
      (tutorial-nav)]]

)

(defpartial tutorial1-html []
  [:div.row-fluid
    [:div.span12.container
      [:h2 "Basic Arithemetic"]
      [:p "Clojure uses a prefix notation which might be a little difficult at first for those who are used to using infix notation. Let's look at an example."]]]
  [:div.row-fluid
    [:div.span4
      [:p "Here the first element in the expresion is an addition sign, this takes up the control location of the list. The other two parameters are arguments to the addition operator"]]
    [:div.span4
      [:div.code_container
        [:textarea.code {:data-result "#tutorial1-example1" :data-expected "3"} "(+ 1 2)"]]]
    [:div.span4.result_container
      [:pre#tutorial1-example1]]]
  [:div.row-fluid
    [:div.span4
      [:p "Most operators work in a similar fashion, this example is broken. Try to see if you can fix it."]]
    [:div.span4
      [:div.code_container
        [:textarea.code {:data-result "#tutorial1-example2" :data-expected "2"} "(10 / 5)"]]]
    [:div.span4.result_container
      [:pre#tutorial1-example2]]])

(defpage "/tutorial" []
  (root-html tutorial-main))

(defpage "/tutorial1" []
  (root-html #(tutorial-html :interactive-tutorial-html tutorial1-html)))
