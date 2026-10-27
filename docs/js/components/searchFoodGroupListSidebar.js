import { escapeHtml } from "../fn/format.js";
import { getLocalizedValue, t } from "../i18n/i18n.js";

function renderFoodGroup(group, selectedFoodCodes, expandedGroupNames) {
  const groupName = getLocalizedValue(group.groupName);
  const isExpanded = expandedGroupNames.has(groupName);

  return `
    <li>
      <a class="app-toggle-sublist" href="#" role="button">
        <span>${escapeHtml(groupName)}</span>
      </a>

      <ul class="app-sublist ${isExpanded ? "" : "is-hidden"}">
        ${group.items
          .map(
            (item) => `
              <li>
                <label class="app-sublist-item">
                  <input type="checkbox" name="foodcode" value="${escapeHtml(item.food_code)}" ${selectedFoodCodes.has(item.food_code) ? "checked" : ""}>
                  <span>${escapeHtml(getLocalizedValue(item.food_name))}</span>
                </label>
              </li>
            `,
          )
          .join("")}
      </ul>
    </li>
  `;
}

export function renderFoodGroupList(foodGroups = [], { selectedFoodCodes = [], expandedGroupNames = [] } = {}) {
  const selectedCodes = new Set(selectedFoodCodes);
  const expandedGroups = new Set(expandedGroupNames);

  return `
    <p class="menu-label app-menu-label">🔍︎ ${t("sidebar.searchByFoodGroups")}:</p>

    <ul class="menu-list">
      ${foodGroups.map((group) => renderFoodGroup(group, selectedCodes, expandedGroups)).join("")}
    </ul>
  `;
}
